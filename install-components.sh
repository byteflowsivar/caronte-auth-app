#!/bin/bash



# List of components
components=(
    "accordion"
    "alert"
    "alert-dialog"
    "aspect-ratio"
    "avatar"
    "badge"
    "breadcrumb"
    "button"
    "calendar"
    "card"
    "carousel"
    "chart"
    "checkbox"
    "collapsible"
    "command"
    "context-menu"
    "dialog"
    "drawer"
    "dropdown-menu"
    "form"
    "hover-card"
    "input"
    "input-otp"
    "label"
    "menubar"
    "navigation-menu"
    "pagination"
    "popover"
    "progress"
    "radio-group"
    "resizable"
    "scroll-area"
    "select"
    "separator"
    "sheet"
    "skeleton"
    "slider"
    "sonner"
    "switch"
    "table"
    "tabs"
    "textarea"
    "toast"
    "toggle"
    "toggle-group"
    "tooltip"
)

# Loop through each component and install it
for component in "${components[@]}"; do
    echo "Installing $component..."
    echo yes | npx shadcn@latest add $component
    echo "$component installed!"
done

echo "All components installed successfully!"
