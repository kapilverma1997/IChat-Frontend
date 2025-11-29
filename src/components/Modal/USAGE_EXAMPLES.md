# Modal Component Usage Examples

This document shows how to use the modern modal system to replace `window.confirm()` and `alert()`.

## Setup

The ModalProvider is already set up in `index.js`. Just import and use the `useModal` hook in any component.

## Basic Usage

```javascript
import { useModal } from "../../context/ModalContext";

function MyComponent() {
    const { showConfirm, showAlert, showSuccess, showError } = useModal();

    // Your component code...
}
```

## Examples

### 1. Confirmation Dialog (Replaces window.confirm)

**Old way:**
```javascript
const confirmed = window.confirm("Are you sure you want to delete this?");
if (confirmed) {
    // Delete action
}
```

**New way:**
```javascript
const confirmed = await showConfirm(
    "Delete Item",
    "Are you sure you want to delete this? This action cannot be undone.",
    {
        confirmText: "Delete",
        cancelText: "Cancel",
        type: "warning"
    }
);

if (confirmed) {
    // Delete action
}
```

### 2. Information Alert (Replaces alert)

**Old way:**
```javascript
alert("Operation completed successfully!");
```

**New way:**
```javascript
await showAlert(
    "Information",
    "Operation completed successfully!",
    {
        type: "info"
    }
);
```

### 3. Success Message

```javascript
await showSuccess(
    "Success!",
    "Your changes have been saved successfully."
);
```

### 4. Error Message

```javascript
await showError(
    "Error",
    "Failed to save changes. Please try again."
);
```

### 5. Custom Modal with Callbacks

```javascript
await showModal({
    title: "Custom Modal",
    message: "This is a custom modal with callbacks",
    type: "info",
    confirmText: "Proceed",
    cancelText: "Go Back",
    showCancel: true,
    onConfirm: () => {
        console.log("User confirmed");
    },
    onCancel: () => {
        console.log("User cancelled");
    }
});
```

### 6. Real-world Example: Delete with Success/Error Feedback

```javascript
const handleDelete = async () => {
    const confirmed = await showConfirm(
        "Delete Item",
        "Are you sure you want to delete this item?",
        {
            confirmText: "Delete",
            cancelText: "Cancel",
            type: "warning"
        }
    );

    if (confirmed) {
        try {
            await deleteItem();
            await showSuccess(
                "Deleted",
                "Item has been deleted successfully."
            );
        } catch (error) {
            await showError(
                "Delete Failed",
                "Failed to delete item. Please try again."
            );
        }
    }
};
```

## Modal Types

- `"info"` - Blue, informational messages
- `"success"` - Green, success messages
- `"error"` - Red, error messages
- `"warning"` - Orange, warning messages

## Features

- ✅ Promise-based API (use `await`)
- ✅ Smooth animations
- ✅ Keyboard support (ESC to close)
- ✅ Click outside to close
- ✅ Accessible (ARIA attributes)
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Customizable buttons and text
- ✅ Type-specific styling (success, error, warning, info)

## API Reference

### showConfirm(title, message, options?)
Returns: `Promise<boolean>`

Shows a confirmation dialog with Yes/No buttons.

### showAlert(title, message, options?)
Returns: `Promise<void>`

Shows an informational alert with OK button.

### showSuccess(title, message, options?)
Returns: `Promise<void>`

Shows a success message with OK button.

### showError(title, message, options?)
Returns: `Promise<void>`

Shows an error message with OK button.

### showModal(options)
Returns: `Promise<boolean>`

Shows a custom modal with full control.

**Options:**
- `title` (string) - Modal title
- `message` (string) - Modal message
- `type` (string) - "info" | "success" | "error" | "warning"
- `confirmText` (string) - Confirm button text (default: "Confirm")
- `cancelText` (string) - Cancel button text (default: "Cancel")
- `showCancel` (boolean) - Show cancel button (default: true)
- `onConfirm` (function) - Callback on confirm
- `onCancel` (function) - Callback on cancel

