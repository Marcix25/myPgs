<!-- Automatically generated from reference/html/layout/pageShell.html. Edit reference/html/layout/pageShell.html and run npm run docs:generate again. -->

# Page Shell

Responsive page layout that combines main content with zero, one or two sidebars and adapts their width, position and scrolling behavior.

## PGS

- `pageShell`: identifies the container that calculates the main and aside composition.
- `pageShell-aside`: identifies a sidebar that can be placed before or after the content.
- `pageShell-content`: identifies the main page content.

## PGS Options

- `pageShellFullPage`: expands the shell to the full available width while keeping its content centered.
- `pageShellAsideScroll`: makes every sidebar stick beside the content and scroll on its own, clamped to the viewport height.
- `pageShellAsideScrollFlush`: the same, with the sidebar pulled up over the shell's top padding so it starts flush with the top; both release the sticky behaviour once the sidebar stacks.
- `pageShellAsideShadow`: fades the top and bottom edges of a sidebar instead of cutting its content abruptly; independent of pageShellAsideScroll, but only meaningful alongside it.

## Related elements

### PGS

- `flexColumn`: organizes text contained in the sidebars.

### PGS Options

- `gapElements`: applies element spacing in the main sections.

## CSS Variables

- `--pageShell-aside-maxHeight`
- `--pageShell-aside-top`
- `--pageShell-aside-width`
- `--pageShell-content-width`
- `--pageShell-gap`
- `--pageShell-padding-bottom`
- `--pageShell-padding-inline`
- `--pageShell-padding-top`
- `--pageShell-sizeMaskImage`
- `--pageShell-width`

## Output

Nine page-shell HTML configurations with two, one, or no sidebars, with pageShellAsideScroll, its flush or shadow variant, or neither.

## Example

## Page Shell simple

### Full-width with sidebar

Full-width shell with a single sidebar before the main content, using pageShellFullPage.

```html
<div pgs="pageShell" pgs-option="pageShellFullPage pageShellAsideScroll">
    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumn" pgs-option="gapElements">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>
</div>
```

### Full-width with sidebar flush

Same full-width shell with a single sidebar before the main content, using pageShellAsideScrollFlush.

```html
<div pgs="pageShell" pgs-option="pageShellAsideScroll">
    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumn" pgs-option="gapElements">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>

    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>
</div>
```

### Single sidebar

Default-width shell with a single sidebar before the main content, scrolling on its own with pageShellAsideScroll.

```html
<div pgs="pageShell" pgs-option="pageShellAsideScroll">
    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumn" pgs-option="gapElements">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>
</div>
```

### Single sidebar, flush

Same single sidebar, but with pageShellAsideScrollFlush: the sidebar is pulled up over the shell's top padding so it starts flush with the top instead of sitting below it.

```html
<div pgs="pageShell" pgs-option="pageShellAsideScrollFlush">
    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumn" pgs-option="gapElements">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>
</div>
```

### Single sidebar, shadow

Same single sidebar, with pageShellAsideShadow: its scrolling edges fade out instead of cutting content abruptly.

```html
<div pgs="pageShell" pgs-option="pageShellAsideScroll pageShellAsideShadow">
    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumn" pgs-option="gapElements">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>
</div>
```

### Sidebar after content

Shell with the sidebar placed after the main content instead of before it, scrolling on its own with pageShellAsideScroll.

```html
<div pgs="pageShell" pgs-option="pageShellAsideScroll">

    <main pgs="pageShell-content">
        <section pgs="flexColumn" pgs-option="gapElements">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>

    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>
</div>
```

## Page Shell - Not scroll

Description for the not scroll page shell layout.

### Not scroll - Two sidebars

Shell with a sidebar on both sides of the main content.

```html
<div pgs="pageShell">
    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumn" pgs-option="gapElements">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>

    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>
</div>
```

### Not scroll - Single sidebar

Default-width shell with a single sidebar before the main content.

```html
<div pgs="pageShell">
    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumn" pgs-option="gapElements">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>
</div>
```

### Not scroll - Sidebar after content

Shell with the sidebar placed after the main content instead of before it.

```html
<div pgs="pageShell">

    <main pgs="pageShell-content">
        <section pgs="flexColumn" pgs-option="gapElements">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>

    <aside pgs="pageShell-aside">
        <div pgs="flexColumn">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
        </div>
    </aside>
</div>
```
