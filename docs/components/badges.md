<!-- Automatically generated from reference/html/components/badges.html. Edit reference/html/components/badges.html and run npm run docs:generate again. -->

# Badge

Collection of compact indicators for displaying categories, priorities, and visual states with consistent color variants.

## PGS

- `badge`: identifies the base badge variant.

## PGS Options

- `badgePrimary`: applies the primary color variant.
- `badgeStrong`: applies the high-contrast variant.
- `badgeSuccess`: represents a successful result.
- `badgeDot`: adds a dot indicator to the badge.
- `badgeWarning`: represents a warning.
- `badgeError`: represents an error.
- `badgeInfo`: represents informational content.
- `badgeNeutral`: applies the neutral variant.

## Related elements

### PGS

- `flexRow`: arranges badges horizontally and allows them to wrap.

## Output

HTML examples of the available badge variants.

## Example

### Base

Default badge variant with no color emphasis.

```html
<span pgs="badge">
    Base
</span>
```

### Primary

Badge using the primary color variant.

```html
<span pgs="badge" pgs-option="badgePrimary">
    Primary
</span>
```

### Strong

High-contrast badge variant.

```html
<span pgs="badge" pgs-option="badgeStrong">
    Strong
</span>
```

### Active

Success badge combined with a dot indicator.

```html
<span pgs="badge" pgs-option="badgeSuccess badgeDot">
    Active
</span>
```

### Warning

Badge representing a warning, paired with an icon.

```html
<span pgs="badge" pgs-option="badgeWarning">
    <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
    Warning
</span>
```

### Error

Badge representing an error, paired with an icon.

```html
<span pgs="badge" pgs-option="badgeError">
    <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    Error
</span>
```

### Info

Badge representing informational content, paired with an icon.

```html
<span pgs="badge" pgs-option="badgeInfo">
    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
    Info
</span>
```

### Neutral

Neutral badge variant with muted colors.

```html
<span pgs="badge" pgs-option="badgeNeutral">
    Neutral
</span>
```
