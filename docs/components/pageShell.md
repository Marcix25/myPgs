<!-- File generato automaticamente da templates/html/layout/pageShell.html. Modificare templates/html/layout/pageShell.html e rieseguire npm run docs:generate. -->

# Page Shell

Layout di pagina responsive che combina un contenuto principale con zero, una o due barre laterali scorrevoli, adattandone larghezza e posizione.

## PGS

- `pageShell`: identifica il contenitore che calcola la composizione di main e aside.
- `pageShell-aside`: identifica una barra laterale posizionabile prima o dopo il contenuto.
- `pageShell-aside-scroll`: identifica l'area interna che può restare visibile durante lo scorrimento.
- `pageShell-content`: identifica il contenuto principale della pagina.

## Elementi correlati

- `flexColumnTexts`: organizza i testi contenuti nelle barre laterali.
- `flexColumnElements`: organizza verticalmente gli elementi delle sezioni principali.

## Output

Quattro configurazioni HTML di page shell con due, una o nessuna barra laterale.

## Esempio

```html
<div pgs="pageShell">
    <aside pgs="pageShell-aside">
        <div pgs="pageShell-aside-scroll">
            <div pgs="flexColumnTexts">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
            </div>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumnElements" id="sezione-uno">
            <strong>Lorem ipsum</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>

    <aside pgs="pageShell-aside">
        <div pgs="pageShell-aside-scroll">
            <div pgs="flexColumnTexts">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
            </div>
        </div>
    </aside>
</div>
<div pgs="pageShell">
    <aside pgs="pageShell-aside">
        <div pgs="pageShell-aside-scroll">
            <div pgs="flexColumnTexts">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
            </div>
        </div>
    </aside>

    <main pgs="pageShell-content">
        <section pgs="flexColumnElements" id="sezione-uno">
            <strong>Lorem ipsum</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>
</div>

<div pgs="pageShell">

    <main pgs="pageShell-content">
        <section pgs="flexColumnElements" id="sezione-uno">
            <strong>Lorem ipsum</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>

    <aside pgs="pageShell-aside">
        <div pgs="pageShell-aside-scroll">
            <div pgs="flexColumnTexts">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
            </div>
        </div>
    </aside>
</div>

<div pgs="pageShell">

    <main pgs="pageShell-content">
        <section pgs="flexColumnElements" id="sezione-uno">
            <strong>Lorem ipsum</strong>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?</p>
        </section>
    </main>
</div>
```
