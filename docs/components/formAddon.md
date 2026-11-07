<!-- Automatically generated from reference/html/components/formAddon.html. Edit reference/html/components/formAddon.html and run npm run docs:generate again. -->

# Form Add-ons

The field box that wraps a label and its control, and additional form controls for selectable cards, switches, a select with a list of its own, and compact chip groups. The select box raises pgs:selectBox:change on its root when the reader picks another option, with detail { element, select, option, selected, value, values }, where selected says whether the option is chosen now and values lists every chosen value; the select itself raises input and change as it would on its own.

## PGS

- `field`: a modifier for a text-like input, a textarea, a select or a group, with its label: it adds no look of its own to the controls, it reshapes the tokens inside it. It draws a background and a radius around the label and the control, and no border of its own (only noInput adds one): the border, background and radius an input or a select shows are still their own. The label, written first, floats over the control without taking room, with no box of its own; the input and the select (and a textarea or a file that also carry the token input) take the padding of --field-padding and leave room above for the label. The label is in the middle of the field while the input is empty and out of focus, and small at the top of it with focus or once the input holds text: it needs the input right after it and a placeholder attribute, a single space is enough, it is what tells an empty input from one that holds text. A date, time, datetime-local, month or week input always shows text of its own, so its label always stays at the top, and so does the label of a select and of a select box, whose button takes the same room as a select. A field around a control that is not a text input (a checkbox, a group of radios or checkboxes with its legend as label, a range, a color input, a toggle) takes the option noInput. The look reads --field-background, --field-padding, --field-borderRadius and --field-gap (the space between the label and the text).
- `checkboxBackground`: presents a checkbox, or a radio, as a selectable container with a border. It goes with checkbox or radio on the same label, which draw the box and the text. It takes the hover colors while the pointer is over it, and the two-state colors (--twoState-*) once it is checked; the box inside keeps its own color on hover. The look reads --checkboxBackground-background, --checkboxBackground-color and --checkboxBackground-borderColor, each with a -hover and a -checked one, and --checkboxBackground-padding and --checkboxBackground-borderRadius.
- `toggle`: presents a checkbox as a switch with a rail and a movable thumb. The rail has --toggle-rail-background and --toggle-rail-borderColor and the thumb --toggle-thumb-background, which is also the color of its border, each with a -hover and a -checked one, read from the clickable, hover and two-state tokens; the thumb is the same as the one of range and grows a little while the pointer is over the switch, where the hover colors apply too; a checked toggle keeps its look under the pointer and a disabled one is dimmed.
- `selectBox`: wraps a <select> and stands in for it with a button and a list of its own, drawn the same in every browser: the JavaScript builds them, the select stays in the form out of sight and keeps the value, so a form, required, a reset and formValidate read it as usual. Write the select with its own token (select), which is what shows without JavaScript; its labels name the button and a click on them reaches it. The keys are those of a native select: arrows, Home, End, Page Up and Page Down move, Enter, Space and Tab choose, Escape closes, letters typed in a row jump to the option that starts with them. A <select multiple> keeps the list open: a click, Enter or Space turns the option on or off, Tab and Escape close, and the button lists the chosen options one after the other. An option holds text only, the parser drops any element written in it, but not a <template>: what a <template> in the option holds (an icon of any pack, an svg) is drawn before its text, in the list and in the button, while the native select shows the text alone; mark it aria-hidden="true" when it is only decoration. Optgroups become headings in the list, a disabled option is skipped and a hidden one with an empty value (a placeholder) is not listed: while nothing else is chosen the button shows it dimmed, like the placeholder of an input. Options added or changed later by a script are read again on their own. The look reads --selectBox-list-background, --selectBox-list-color, --selectBox-list-border, --selectBox-list-borderRadius, --selectBox-list-padding, --selectBox-list-gap (between the options), --selectBox-list-offset, --selectBox-list-maxHeight, --selectBox-option-padding and --selectBox-option-background/color-active (also the hover of an option) and -selected; the button is an input with --selectBox-icon (the chevron) turning in --selectBox-timing.
- `chip`: presents an individual checkbox or radio option as a compact selectable button. It shapes the control and leaves the button look to `button`, so write both on the label; inside a `chips` group the token comes from the group and only `button` is written.
- `chips`: groups chip controls into a compact segmented selector.

## PGS generated by JavaScript

- `_selectBox-button`: the button the select box shows in place of the select (role combobox), after it.
- `_selectBox-button-value`: inside the button, the text of the chosen option.
- `_selectBox-list`: the list of the options (role listbox), after the button.
- `_selectBox-list-option`: one option of the list (role option), aria-selected on the chosen one.
- `_selectBox-list-group`: the label of an optgroup, a heading of the list the keys skip.

## PGS Options (component brackets)

- `noInput`: inside field's own bracket, `field['noInput']`, for a field whose control is not a text input (a checkbox, a radio group, a range, a color input, a toggle, chips): no input carries the room for the label, so the field keeps it as its own padding, all around and with more room above, and draws the border (--border-complete) itself.

## PGS States

- `open`: on a selectBox while its list is open.
- `openUp`: on an open selectBox whose list opens above the button, because there is no room for it below.
- `empty`: on a selectBox with nothing chosen, or a chosen option with an empty value (a placeholder).
- `active`: on the _selectBox-list-option the keys are on; the option under the pointer takes the same look through :hover.

## JavaScript API

- `pgs.selectBox.init(root)`: initializes the select boxes inside the specified Document or Element, including the root when it is one. A select box with no <select> as a direct child is reported in the console and left alone.
- `pgs.selectBox.api(element)`: returns the instance associated with an initialized select box.
- `instance.open()`: opens the list on the chosen option (the first chosen one on a multiple select).
- `instance.close()`: closes the list.
- `instance.toggle()`: opens or closes the list.
- `instance.isOpen()`: returns true while the list is open.
- `instance.update()`: reads the options and the value of the select again, for a change a script made without raising change.
- `instance.destroy()`: removes the generated button and list and the listeners, and gives the select back.
- `instance.refresh()`: destroys the instance and builds a new one on the same element, and returns it.

## Related elements

### PGS

- `label`: the label of the field, which floats over the control; see Form.
- `input`: the text-like control of the field; see Form.
- `textarea`: the textarea of the field, which also takes the token input; see Form.
- `select`: the select of the field, and the one a select box stands in for, which shows without JavaScript; see Form Controls.
- `file`: the file input of the field; see Form Controls.
- `range`: the range of a field with noInput; see Form Controls.
- `inputColor`: the color input of a field with noInput; see Form Controls.
- `flex`: provides the flex layout; direction and spacing are flags in its bracket.
- `form`: identifies the form that holds the add-on examples, laid out in a column; it styles none of the controls.
- `icon`: draws the glyphs this example shows; see Icon for the whole set.
- `legend`: applies the group heading styling to a chips group's legend; see Form.
- `fieldset`: takes the browser's border off the fieldset that holds the radio group; see Form.
- `checkbox`: draws the box and the text of the label of a checkbox, together with checkboxBackground; see Form.
- `radio`: draws the box and the text of the label of a radio, together with checkboxBackground; see Form.
- `button`: draws the chip, which composes the button look instead of redrawing it, and hides the checkbox or radio it wraps; see Button.

### PGS Options (component brackets)

- `column`: vertically arranges each example with its heading and control.
- `row`: horizontally arranges standalone chip controls.
- `gapElements`: applies element spacing between the form add-on examples.
- `icon-star`: the neutral stand-in glyph, used where the example needs an icon but not a particular one.
- `btnMini`: sizes that button down to the chip's compact size.
- `btnTwoState`: hides the checkbox or radio the label wraps and draws its checked state; belongs to the button component.

## Output

HTML examples of the field, checkboxBackground, toggle, select box (single and multiple), chip, and chips form controls.
## Field

### Field

The label floats over the input: it needs the input right after it and a placeholder attribute, a single space is enough.

```html
<div pgs="field">
    <label pgs="label" for="fieldName">Name</label>
    <input pgs="input" id="fieldName" type="text" name="fieldName" placeholder=" " required>
</div>
<div pgs="field">
    <label pgs="label" for="fieldEmail">Email</label>
    <input pgs="input" id="fieldEmail" type="email" name="fieldEmail" placeholder=" " required>
</div>
```

### Field, textarea

A textarea in a field also takes the token input, so that the label floats over it.

```html
<div pgs="field">
    <label pgs="label" for="fieldMessage">Message</label>
    <textarea pgs="textarea input" id="fieldMessage" name="fieldMessage" rows="4" placeholder=" " required></textarea>
</div>
```

### Field, date

A date, time, datetime-local, month or week input always shows text of its own, so its label always stays at the top.

```html
<div pgs="field">
    <label pgs="label" for="fieldDate">Date</label>
    <input pgs="input" id="fieldDate" type="date" name="fieldDate" placeholder=" " required>
</div>
```

### Field, select

The select keeps its own token; its first option takes the part of the placeholder.

```html
<div pgs="field">
    <label pgs="label" for="fieldCountry">Country</label>
    <select pgs="select" id="fieldCountry" name="fieldCountry" required>
        <option value="" selected disabled>Choose a country</option>
        <option value="it">Italy</option>
        <option value="fr">France</option>
    </select>
</div>
```

### Field, select box

A select box in a field: its button takes the room of the label like a select, and the label stays at the top.

```html
<div pgs="field">
    <label pgs="label" for="fieldSelectBox">Country</label>
    <div pgs="selectBox">
        <select pgs="select" id="fieldSelectBox" name="fieldSelectBox" required>
            <option value="" selected disabled hidden>Choose a country</option>
            <option value="it">Italy</option>
            <option value="fr">France</option>
            <option value="de">Germany</option>
        </select>
    </div>
</div>
```

### Field, file

A file input also takes the token input.

```html
<div pgs="field">
    <label pgs="label" for="fieldFile">File</label>
    <input pgs="file input" id="fieldFile" type="file" name="fieldFile" required>
</div>
```

### Field, range and color

A field around a control that is not a text input takes the option noInput.

```html
<div pgs="field['noInput']">
    <label pgs="label" for="fieldRange">Range</label>
    <input pgs="range" id="fieldRange" type="range" name="fieldRange" min="0" max="100" value="40">
</div>
<div pgs="field['noInput']">
    <label pgs="label" for="fieldColor">Color</label>
    <input pgs="inputColor" id="fieldColor" type="color" name="fieldColor" value="#3aa561">
</div>
```

### Field, radio group

A fieldset with noInput: the legend is the label of the field.

```html
<fieldset pgs="fieldset field['noInput'] radio">
    <legend pgs="legend">A radio group</legend>
    <label pgs="radio"><input type="radio" name="fieldRadio" value="email" required> <span>Email</span></label>
    <label pgs="radio"><input type="radio" name="fieldRadio" value="phone" required> <span>Phone</span></label>
</fieldset>
```

### Field, checkbox group

The same for a group of checkboxes.

```html
<fieldset pgs="fieldset field['noInput'] checkbox">
    <legend pgs="legend">A checkbox group</legend>
    <label pgs="checkbox"><input type="checkbox" name="fieldCheckbox" value="news" required> <span>News</span></label>
    <label pgs="checkbox"><input type="checkbox" name="fieldCheckbox" value="offers" required> <span>Offers</span></label>
</fieldset>
```

## Add-ons

### Checkbox with background

A single checkbox presented as a selectable container, with the checked state highlighted.

```html
<label pgs="checkboxBackground checkbox">
    <input type="checkbox" name="notifications" value="enabled">
    <span>
        <strong>Enable notifications</strong><br>
        Receive important account updates.
    </span>
</label>
```

### Radio group with background

Radio inputs sharing the same name and presented as selectable containers, so only one can be checked.

```html
<fieldset pgs="fieldset flex['row']">
    <label pgs="checkboxBackground radio">
        <input type="radio" name="plan" value="basic" checked>
        Basic
    </label>

    <label pgs="checkboxBackground radio">
        <input type="radio" name="plan" value="pro">
        Pro
    </label>

    <label pgs="checkboxBackground radio">
        <input type="radio" name="plan" value="enterprise">
        Enterprise
    </label>
</fieldset>
```

### Toggle

Checkbox presented as a switch with a rail and movable thumb.

```html
<label pgs="toggle">
    <span>Enable Wi-Fi</span>
    <input type="checkbox" name="darkMode" value="enabled">
</label>
```

### Select box

A select with a list of its own: the first option, hidden, is the placeholder, and the optgroups become headings.

```html
<label pgs="label" for="selectBoxCountry">Country</label>
<div pgs="selectBox">
    <select pgs="select" id="selectBoxCountry" name="selectBoxCountry" required>
        <option value="" selected disabled hidden>Choose a country</option>
        <optgroup label="Europe">
            <option value="it"><template><i pgs="icon['icon-star']" aria-hidden="true"></i></template>Italy</option>
            <option value="fr"><template><i pgs="icon['icon-star']" aria-hidden="true"></i></template>France</option>
            <option value="de"><template><i pgs="icon['icon-star']" aria-hidden="true"></i></template>Germany</option>
        </optgroup>
        <optgroup label="America">
            <option value="us">United States</option>
            <option value="br">Brazil</option>
            <option value="ca" disabled>Canada</option>
        </optgroup>
    </select>
</div>
```

### Select box, multiple

A select multiple keeps the list open while its options are turned on and off; the hidden option is the placeholder shown while nothing is chosen.

```html
<label pgs="label" for="selectBoxTopics">Topics</label>
<div pgs="selectBox">
    <select pgs="select" id="selectBoxTopics" name="selectBoxTopics" multiple>
        <option value="" hidden>Choose the topics</option>
        <option value="news">News</option>
        <option value="events">Events</option>
        <option value="offers">Offers</option>
        <option value="jobs">Jobs</option>
    </select>
</div>
```

### Chips checkbox

Individual checkbox options presented as compact selectable chip buttons.

```html
<div pgs="flex['row']" role="group" aria-label="Chip actions">
    <label pgs="button['btnMini' 'btnTwoState'] chip">
        <input type="checkbox" name="like" value="basic">
        <i pgs="icon['icon-star']"></i>
        Like
    </label>
    <label pgs="button['btnMini' 'btnTwoState'] chip">
        <input type="checkbox" name="share" value="basic">
        <i pgs="icon['icon-star']"></i>
        Share
    </label>
</div>
```

### Chips group (checkbox)

Multiple checkbox chips grouped into a compact segmented selector.

```html
<fieldset pgs="chips">
    <legend pgs="legend">Chip checkbox</legend>
    <label pgs="button['btnMini' 'btnTwoState']">
        <input type="checkbox" name="plan" value="red" checked>
        Red
    </label>

    <label pgs="button['btnMini' 'btnTwoState']">
        <input type="checkbox" name="plan" value="blue">
        Blue
    </label>

    <label pgs="button['btnMini' 'btnTwoState']">
        <input type="checkbox" name="plan" value="green">
        Green
    </label>
</fieldset>
```

### Chips group (radio)

Multiple radio chips grouped into a compact segmented selector, each paired with an icon.

```html
<fieldset pgs="chips">
    <legend pgs="legend">Chips radio</legend>
    <label pgs="button['btnMini' 'btnTwoState']">
        <input type="radio" name="characters" value="Crow" checked>
        <i pgs="icon['icon-star']"></i>
        Crow
    </label>

    <label pgs="button['btnMini' 'btnTwoState']">
        <input type="radio" name="characters" value="Dove">
        <i pgs="icon['icon-star']"></i>
        Dove
    </label>

    <label pgs="button['btnMini' 'btnTwoState']">
        <input type="radio" name="characters" value="Dragon">
        <i pgs="icon['icon-star']"></i>
        Dragon
    </label>
</fieldset>
```
