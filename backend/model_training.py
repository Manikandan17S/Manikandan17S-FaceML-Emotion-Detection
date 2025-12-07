import os
import time
from typing import Dict
from emotion_cnn import EmotionCNN
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# =========================
# Config
# =========================
DATASET_ROOT = os.path.join("backend","dataset")  # expects dataset/train and dataset/test
TRAIN_DIR = os.path.join(DATASET_ROOT, "train")
VAL_DIR = os.path.join(DATASET_ROOT, "test")

BATCH_SIZE = 64
NUM_EPOCHS = 15
LEARNING_RATE = 1e-3

# Emotion labels in the SAME ORDER as your app.py
EMOTION_LABELS = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"[INFO] Using device: {device}")


# =========================
# Data Loading
# =========================
def get_dataloaders() -> Dict[str, DataLoader]:
    # Transforms: grayscale -> resize -> tensor -> normalize
    transform = transforms.Compose([
        transforms.Grayscale(num_output_channels=1),
        transforms.Resize((48, 48)),
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))
    ])

    print("[INFO] Loading datasets...")

    train_dataset = datasets.ImageFolder(root=TRAIN_DIR, transform=transform)
    val_dataset = datasets.ImageFolder(root=VAL_DIR, transform=transform)

    print(f"[INFO] Found train classes: {train_dataset.classes}")
    print(f"[INFO] Found val classes:   {val_dataset.classes}")

    # Map dataset indices to our fixed EMOTION_LABELS order
    # dataset.class_to_idx is like {'angry': 0, 'disgust': 1, ...} but order may differ
    def build_target_transform(ds: datasets.ImageFolder):
        ds_mapping = ds.class_to_idx  # label -> idx in this dataset
        # Create mapping from ds_idx -> our_idx (0..6)
        idx_map = {}
        for label, ds_idx in ds_mapping.items():
            if label not in EMOTION_LABELS:
                raise ValueError(f"Label '{label}' in dataset is not in EMOTION_LABELS {EMOTION_LABELS}")
            our_idx = EMOTION_LABELS.index(label)
            idx_map[ds_idx] = our_idx
        return lambda idx: idx_map[idx]

    train_dataset.target_transform = build_target_transform(train_dataset)
    val_dataset.target_transform = build_target_transform(val_dataset)

    train_loader = DataLoader(
        train_dataset,
        batch_size=BATCH_SIZE,
        shuffle=True,
        num_workers=0,     # 0 for Windows; you can increase if on Linux
        pin_memory=(device.type == "cuda")
    )

    val_loader = DataLoader(
        val_dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=0,
        pin_memory=(device.type == "cuda")
    )

    return {"train": train_loader, "val": val_loader}


# =========================
# Training & Evaluation
# =========================
def train_model():
    dataloaders = get_dataloaders()

    model = EmotionCNN().to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=LEARNING_RATE)

    best_val_acc = 0.0
    save_path = "emotion_model.pt"

    print("[INFO] Starting training...")
    for epoch in range(NUM_EPOCHS):
        print(f"\n===== Epoch {epoch + 1}/{NUM_EPOCHS} =====")

        # Each epoch has a training and validation phase
        for phase in ["train", "val"]:
            if phase == "train":
                model.train()
            else:
                model.eval()

            running_loss = 0.0
            running_corrects = 0
            total_samples = 0

            start_time = time.time()

            for inputs, labels in dataloaders[phase]:
                inputs = inputs.to(device)
                labels = labels.to(device)

                optimizer.zero_grad()

                with torch.set_grad_enabled(phase == "train"):
                    outputs = model(inputs)
                    loss = criterion(outputs, labels)

                    _, preds = torch.max(outputs, 1)

                    if phase == "train":
                        loss.backward()
                        optimizer.step()

                batch_size = inputs.size(0)
                running_loss += loss.item() * batch_size
                running_corrects += torch.sum(preds == labels).item()
                total_samples += batch_size

            epoch_loss = running_loss / total_samples
            epoch_acc = running_corrects / total_samples

            elapsed = time.time() - start_time
            print(f"[{phase.upper()}] Loss: {epoch_loss:.4f}  Acc: {epoch_acc:.4f}  (time: {elapsed:.1f}s)")

            # Save best model on validation
            if phase == "val" and epoch_acc > best_val_acc:
                best_val_acc = epoch_acc
                torch.save(model.state_dict(), save_path)
                print(f"[INFO] New best model saved to {save_path} with val acc {best_val_acc:.4f}")

    print("\n[INFO] Training complete.")
    print(f"[INFO] Best validation accuracy: {best_val_acc:.4f}")
    print(f"[INFO] Final model weights saved as: {save_path}")


if __name__ == "__main__":
    if not os.path.isdir(TRAIN_DIR) or not os.path.isdir(VAL_DIR):
        raise FileNotFoundError(
            f"Could not find dataset folders.\n"
            f"Expected:\n  {TRAIN_DIR}\n  {VAL_DIR}\n"
            f"Make sure you extracted images like:\n"
            f"dataset/train/angry, dataset/train/happy, ...\n"
            f"dataset/test/angry, dataset/test/happy, ..."
        )

    print("[INFO] EMOTION_LABELS (index order):")
    for i, lbl in enumerate(EMOTION_LABELS):
        print(f"  {i}: {lbl}")

    print("[INFO] Using device:", device)
    print("[DEBUG] Starting training...")
    train_model()
    print("[DEBUG] Training finished.")
