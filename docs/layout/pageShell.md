<!-- Automatically generated from reference/html/layout/pageShell.html. Edit reference/html/layout/pageShell.html and run npm run docs:generate again. -->

# Page Shell

Responsive page layout that combines main content with zero, one or two sidebars and adapts their width, position and scrolling behavior.

## PGS

- `pageShell`: identifies the container that calculates the main and aside composition.
- `pageShell-aside`: identifies a sidebar that can be placed before or after the content.
- `pageShell-aside-scroll`: enables sticky positioning and contained vertical scrolling for its sidebar.
- `pageShell-content`: identifies the main page content.

## Related elements

- `flexColumn`: organizes text contained in the sidebars.
- `gapElements`: applies element spacing in the main sections.

## Output

Four page-shell HTML configurations with two, one, or no sidebars.

## Example

```html
<div pgs="pageShell">
    <aside pgs="pageShell-aside">
        <div pgs="pageShell-aside-scroll">
            <div pgs="flexColumn">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
            </div>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumn gapElements" id="sezione-uno">
            <strong>Lorem ipsum</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>

    <aside pgs="pageShell-aside">
        <div pgs="pageShell-aside-scroll">
            <div pgs="flexColumn">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
            </div>
        </div>
    </aside>
</div>
<div pgs="pageShell">
    <aside pgs="pageShell-aside">
        <div pgs="pageShell-aside-scroll">
            <div pgs="flexColumn">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
            </div>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumn gapElements" id="sezione-uno">
            <strong>Lorem ipsum</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>
</div>

<div pgs="pageShell">

    <main pgs="pageShell-content">
        <section pgs="flexColumn gapElements" id="sezione-uno">
            <strong>Lorem ipsum</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>

    <aside pgs="pageShell-aside">
        <div pgs="pageShell-aside-scroll">
            <div pgs="flexColumn">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
            </div>
        </div>
    </aside>
</div>

<div pgs="pageShell">

    <main pgs="pageShell-content">
        <section pgs="flexColumn gapElements" id="sezione-uno">
            <strong>Lorem ipsum</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>
</div>
```
