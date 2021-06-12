window.addEventListener("DOMContentLoaded", () => {
    const articleContent = document.getElementById("article-content");
    console.log("{{content|safe}}");
    let content = JSON.parse(JSON.stringify({{ content|safe }}));
    let blocks = content.blocks;
    console.log(blocks.length);

    for (let index = 0; index <= blocks.length; index++) {
        console.log(blocks[index], index);

        switch (blocks[index].type) {
            case "Header":
                let head = document.createElement(`h${blocks[index].data.level}`);
                head.textContent = blocks[index].data.text;
                articleContent.appendChild(head);
                break;

            case "Image":
                let div = document.createElement("div");
                let image = document.createElement("img");
                let caption = document.createElement("small");
                image.src = `${blocks[index].data.file.url}`;
                image.style = "margin-top:10px;";
                image.height = 200;
                image.width = 200;
                caption.textContent = blocks[index].data.caption;
                caption.style = "margin-top:5px;";
                div.appendChild(image);
                div.appendChild(caption);
                div.style = "width:30%;display:grid;place-items:center";
                articleContent.appendChild(div);
                break;

            case "List":
                let list;
                if (blocks[index].data.style == "unordered") {
                    list = document.createElement("ul");
                } else {
                    list = document.createElement("ol");
                }
                for (const item in blocks[index].data.items) {
                    let li = document.createElement("li");
                    li.textContent = blocks[index].data.items[item];
                    list.appendChild(li);
                }
                articleContent.appendChild(list);
                break;

            case "Raw":
                let blockquote = document.createElement("blockquote");
                let code = document.createElement("code");
                let pre = document.createElement("pre");
                pre.textContent = blocks[index].data.html;
                pre.style.background = "#dddddd";
                pre.style.color = "#131313";
                pre.style.padding = "15px";
                code.appendChild(pre);
                articleContent.appendChild(code);
                break;

            case "Attaches":
                let parent = document.createElement("div");
                parent.style =
                    "margin-top:10px;width:30%; padding:10px; border:1px solid black;border-radius:8px;";
                let a = document.createElement("a");
                let name = document.createElement("h4");
                a.href = `${blocks[index].data.file.url}`;
                a.textContent = `Download ${blocks[index].data.file.extension} (${
                    blocks[index].data.file.size / 1000
                } kb)`;
                a.style = "grid-column: 1 / span 2";
                name.textContent = blocks[index].data.file.name;

                parent.appendChild(name);
                parent.appendChild(a);

                articleContent.appendChild(parent);
                break;

            case "paragraph":
                const p = document.createElement("p");
                p.innerHTML = blocks[index].data.text;
                articleContent.appendChild(p);
                break;

            case "Link":
                let parent2 = document.createElement("div");
                let a2 = document.createElement("a");
                parent2.style =
                    " margin-top:10px; width:30%;display:grid; grid-template-columns: 1fr 50px; padding:10px; border:1px solid black;border-radius:8px;";

                if (blocks[index].data.meta.title) {
                    let title = document.createElement("p");
                    title.textContent = blocks[index].data.meta.title;
                    parent2.appendChild(title);
                }
                if (blocks[index].data.meta.image.url !== "") {
                    let parent3 = document.createElement("div");
                    let img = document.createElement("img");

                    img.src = blocks[index].data.meta.image.url;
                    parent3.style = " display:grid;place-items:center";

                    img.height = 40;
                    img.width = 40;
                    parent3.appendChild(img);
                    parent2.appendChild(parent3);
                }

                if (blocks[index].data.meta.description) {
                    let desc = document.createElement("small");
                    desc.style = "grid-column: 1 / span 2";
                    desc.textContent = blocks[index].data.meta.description;
                    parent2.appendChild(desc);
                }
                a2.style = "text-decoration:none;color:black";
                a2.href = blocks[index].data.link;
                a2.appendChild(parent2);
                articleContent.appendChild(a2);
                break;

            default:
                break;
        }
    }
});