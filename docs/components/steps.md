<!-- Automatically generated from reference/html/components/steps.html. Edit reference/html/components/steps.html and run npm run docs:generate again. -->

# Steps

Ordered list of steps showing a number, content, and connecting line, with missing structural elements added at runtime.

## PGS

- `steps`: identifies the ordered list initialized by the steps module.
- `steps-step`: identifies each step in the sequence.
- `steps-step-circle`: identifies the numeric indicator, which is created automatically when missing.
- `steps-step-content`: identifies the text content of the step.
- `steps-step-line`: identifies the connecting line dynamically added to each step.

## JavaScript API

- `pgs.steps.init(root)`: initializes unregistered step lists within the specified Document or Element.
- `pgs.steps.api(element)`: returns the instance associated with an initialized steps root.
- `instance.steps()`: returns an array containing every steps-step element.
- `instance.getStep(index)`: returns the step at the specified index.
- `instance.getTotal()`: returns the total number of steps.
- `instance.refresh()`: reinitializes the list, recreates missing elements, and returns the new instance.

## Output

Ordered HTML list of numbered steps completed by the JavaScript module.

## Example

```html
<ol pgs="steps">
    <li pgs="steps-step">
        <span pgs="steps-step-circle">1</span>
        <div pgs="steps-step-content">
            <h3>Primo step</h3>
            <p>Descrizione del primo passaggio.</p>
        </div>
    </li>

    <li pgs="steps-step">
        <span pgs="steps-step-circle">2</span>
        <div pgs="steps-step-content">
            <h3>Secondo step</h3>
            <p>Descrizione del secondo passaggio.</p>
        </div>
    </li>

    <li pgs="steps-step">
        <span pgs="steps-step-circle">3</span>
        <div pgs="steps-step-content">
            <h3>Terzo step</h3>
            <p>Descrizione del terzo passaggio.</p>
        </div>
    </li>
</ol>
```
