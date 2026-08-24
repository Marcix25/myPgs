const contentText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dolore veniam nulla hic voluptatum harum illo voluptatem quos. Id quibusdam nemo, mollitia iusto quisquam tenetur doloremque corrupti natus nisi est sed consectetur deserunt? Fugiat consectetur iure aut id voluptate unde autem eius facilis dolorum? Eveniet, sit, excepturi iusto porro eos temporibus illum non ut sunt ex aut earum neque. Iure harum similique autem commodi ratione enim quisquam soluta rem, eius dolor officiis necessitatibus voluptatibus obcaecati vel sint iusto. Eligendi reiciendis aut error rem? Hic aliquid tenetur porro itaque quaerat excepturi consequatur veniam, et alias molestiae, eius odio quae maiores suscipit iure voluptatibus sed dolor facere ipsa quod libero necessitatibus, placeat natus. Doloribus esse nobis culpa ab ut dolorem id expedita nesciunt necessitatibus ipsam natus accusantium eius eveniet eum, distinctio quos modi perspiciatis earum sequi nostrum consequatur quibusdam? Blanditiis iusto possimus officia odio animi repudiandae? Repellendus autem ut soluta facere accusamus magni aut architecto cumque cupiditate. Nostrum officiis, tenetur consequuntur quaerat alias animi debitis? Quae quas placeat iure alias totam quaerat fugit recusandae sed, earum ipsa nihil molestiae quam odit itaque, odio asperiores, mollitia porro ratione tempora laboriosam. Incidunt aliquam nobis sunt ut molestiae nam animi placeat neque vero ratione? Eaque?";

function Aside() {
    return (
        <aside pgs="pageShell-aside">
            <div pgs="pageShell-aside-scroll">
                <div pgs="flexColumn">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab modi ut sunt est illum accusantium dolores eum aut cum itaque.</p>
                </div>
            </div>
        </aside>
    );
}

function MainContent() {
    return (
        <main pgs="pageShell-content">
            <section pgs="flexColumn gapElements" id="section-one">
                <strong>Lorem ipsum</strong>
                <p>{contentText}</p>
            </section>
        </main>
    );
}

export default function PageShell() {
    return (
        <>
            <div pgs="pageShell">
                <Aside />
                <MainContent />
                <Aside />
            </div>

            <div pgs="pageShell">
                <Aside />
                <MainContent />
            </div>

            <div pgs="pageShell">
                <MainContent />
                <Aside />
            </div>

            <div pgs="pageShell">
                <MainContent />
            </div>
        </>
    );
}
