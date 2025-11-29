# IChat Logo Component

A modern, premium SaaS-style logo component with gradient effects, 3D animations, and theme support.

## Features

- ✨ **Modern Typography** - Premium SaaS feel with custom gradient text
- 🎨 **Eye-catching Gradients** - Animated gradient effects that shift smoothly
- 💎 **3D Effects** - Perspective transforms and depth on hover
- 🌟 **Glow Effects** - Subtle pulsing glow and enhanced shadows
- 🎭 **Theme Support** - Automatically adapts to light and dark themes
- 📱 **Responsive** - Multiple size variants (small, medium, large, xlarge)
- ♿ **Accessible** - Reduced motion support and focus states
- 🎯 **Optional Icon** - Integrated chat icon that can be toggled

## Usage

### Basic Usage

```jsx
import Logo from '../../components/Logo/Logo';

function MyComponent() {
    return (
        <div>
            <Logo />
        </div>
    );
}
```

### With Custom Props

```jsx
import Logo from '../../components/Logo/Logo';

function MyComponent() {
    return (
        <div>
            {/* Large logo with icon */}
            <Logo size="large" showIcon={true} />
            
            {/* Medium logo without icon */}
            <Logo size="medium" showIcon={false} />
            
            {/* Small logo with custom className */}
            <Logo size="small" showIcon={true} className="my-custom-class" />
        </div>
    );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'large'` | Size variant of the logo |
| `showIcon` | `boolean` | `true` | Whether to display the chat icon |
| `className` | `string` | `''` | Additional CSS classes |

## Size Variants

- **small**: 24px text, 20px icon
- **medium**: 36px text, 28px icon
- **large**: 48px text, 36px icon (default)
- **xlarge**: 64px text, 48px icon

## Theme Integration

The logo automatically uses the theme from `ThemeContext`. It supports:
- **Light theme**: Purple/blue gradient (#667eea → #764ba2 → #f093fb)
- **Dark theme**: Lighter purple/pink gradient (#818cf8 → #a78bfa → #f472b6)

## Standalone HTML/CSS Version

For use outside of React, see `LogoDemo.html` which contains a complete standalone implementation with:
- All CSS styles included
- Theme toggle functionality
- Multiple size examples
- No dependencies required

## Styling Details

### Gradient Animation
The logo features an animated gradient that shifts position over 3 seconds, creating a dynamic, premium feel.

### Hover Effects
- **Text**: 3D perspective transform with scale and translate
- **Icon**: Rotates and scales with enhanced glow
- **Glow**: Intensifies on hover
- **Shine**: Animated shine effect sweeps across the text

### 3D Effects
Uses CSS `perspective` and `rotateX` transforms to create depth and dimension.

### Accessibility
- Respects `prefers-reduced-motion` media query
- Includes focus states for keyboard navigation
- Maintains readability in both light and dark themes

## Examples

### In a Header/Navbar

```jsx
<header>
    <Logo size="medium" showIcon={true} />
    <nav>...</nav>
</header>
```

### On a Landing Page

```jsx
<HeroSection>
    <Logo size="xlarge" showIcon={true} />
    <h2>Welcome to IChat</h2>
</HeroSection>
```

### In a Footer

```jsx
<footer>
    <Logo size="small" showIcon={false} />
    <p>© 2024 IChat. All rights reserved.</p>
</footer>
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS `background-clip: text` support required
- CSS `backdrop-filter` for enhanced effects (optional, degrades gracefully)

## Customization

To customize colors, edit the gradient values in `Logo.module.css`:

```css
.logoLetter {
    background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 50%, #YOUR_COLOR_3 100%);
}
```

## License

Part of the IChat application.

