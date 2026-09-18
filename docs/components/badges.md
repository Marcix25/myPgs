<!-- Automatically generated from reference/html/components/badges.html. Edit reference/html/components/badges.html and run npm run docs:generate again. -->

# Badge

Collection of compact indicators for displaying categories, priorities, and visual states with consistent color variants.

## PGS

- `badge`: identifies the base badge variant.

## PGS Options (component brackets)

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

- `icon`: draws the glyphs this example shows; see Icon for the whole set.

### PGS Options (component brackets)

- `icon-circleInfo`: the information mark.
- `icon-close`: the cross that dismisses.
- `icon-triangleExclamation`: the warning mark.

### Other

- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `flexRow`: arranges badges horizontally and allows them to wrap.

## Output

HTML examples of the available badge variants.
## Examples

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
<span pgs="badge['badgePrimary']">
    Primary
</span>
```

### Strong

High-contrast badge variant.

```html
<span pgs="badge['badgeStrong']">
    Strong
</span>
```

### Active

Success badge combined with a dot indicator.

```html
<span pgs="badge['badgeSuccess' 'badgeDot']">
    Active
</span>
```

### Warning

Badge representing a warning, paired with an icon.

```html
<span pgs="badge['badgeWarning']">
    <i pgs="icon['icon-triangleExclamation']" aria-hidden="true"></i>
    Warning
</span>
```

### Error

Badge representing an error, paired with an icon.

```html
<span pgs="badge['badgeError']">
    <i pgs="icon['icon-close']" aria-hidden="true"></i>
    Error
</span>
```

### Info

Badge representing informational content, paired with an icon.

```html
<span pgs="badge['badgeInfo']">
    <i pgs="icon['icon-circleInfo']" aria-hidden="true"></i>
    Info
</span>
```

### Neutral

Neutral badge variant with muted colors.

```html
<span pgs="badge['badgeNeutral']">
    Neutral
</span>
```
