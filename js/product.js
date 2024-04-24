const products = [
  {
    name: "Skinkind Face Oil",
    image: "./assets/1a.png",
    link: "/",
    price: "$42",
    suitedFor: "All skin types.",
    application: "2-5 drops daily, AM + PM.",
    benefits: "Rebalance stressed skin.",
  },
  {
    name: "Skinkind Face Oil",
    image: "./assets/1a.png",
    link: "/",
    price: "$42",
    suitedFor: "All skin types.",
    application: "2-5 drops daily, AM + PM.",
    benefits: "Rebalance stressed skin.",
  },
  {
    name: "Another Product",
    image: "./assets/new-bottler.jpg",
    link: "/",
    price: "$50",
    suitedFor: "All skin types.",
    application: "1-2 drops daily.",
    benefits: "Hydrates and softens skin.",
  },
  {
    name: "Skinkind Face Oil",
    image: "./assets/1a.png",
    link: "/",
    price: "$42",
    suitedFor: "All skin types.",
    application: "2-5 drops daily, AM + PM.",
    benefits: "Rebalance stressed skin.",
  },
  {
    name: "Skinkind Face Oil",
    image: "./assets/1a.png",
    link: "/",
    price: "$42",
    suitedFor: "All skin types.",
    application: "2-5 drops daily, AM + PM.",
    benefits: "Rebalance stressed skin.",
  },
  {
    name: "Another Product",
    image: "./assets/new-bottler.jpg",
    link: "/",
    price: "$50",
    suitedFor: "All skin types.",
    application: "1-2 drops daily.",
    benefits: "Hydrates and softens skin.",
  },
  {
    name: "Skinkind Face Oil",
    image: "./assets/1a.png",
    link: "/",
    price: "$42",
    suitedFor: "All skin types.",
    application: "2-5 drops daily, AM + PM.",
    benefits: "Rebalance stressed skin.",
  },
  {
    name: "Skinkind Face Oil",
    image: "./assets/1a.png",
    link: "/",
    price: "$42",
    suitedFor: "All skin types.",
    application: "2-5 drops daily, AM + PM.",
    benefits: "Rebalance stressed skin.",
  },
  {
    name: "Another Product",
    image: "./assets/new-bottler.jpg",
    link: "/",
    price: "$50",
    suitedFor: "All skin types.",
    application: "1-2 drops daily.",
    benefits: "Hydrates and softens skin.",
  },
];

function createUISections() {
  const uiSectionList = document.getElementById("ui-section-list");

  // Loop through each product and create UI section
  products.forEach((product, index) => {
    const li = document.createElement("li");
    li.className =
      "relative flex shrink-0 flex-col overflow-hidden w-[92%] sm:w-[75%] md:w-[40%] xl:w-[20%] snap-start";
    li.role = "listitem";

    li.style.zIndex = index % 2 === 0 ? 12 : 10;

    li.style.position = "relative";

    li.innerHTML = ` <div class="group relative grow flex flex-col">
      <card-product-media class="lg:relative z-[1]">
        <a class="relative z-[1] w-full" href="/">
          <div
            class="relative bg-colorCream aspect-[3/4] flex overflow-hidden rounded-t-xl lg:rounded-2xl group-hover:lg:rounded-t-2xl group-hover:lg:rounded-b-none"
          >
            <div class="flex justify-center items-center w-full">
              <img
                src="./assets//1a.png"
                alt="Skinkind Face Oil"
                width="838"
                height="1100"
                loading="lazy"
                sizes="(min-width: 1280px) calc((100vw - 112px - 8px) * 0.30),
(min-width: 800px) calc((100vw - 32px - 8px) * 0.40),
(min-width: 640px) calc((100vw - 32px) * 0.75),
calc((100vw - 32px) * 0.92)"
                class="object-contain w-full h-full"
              />
            </div>
            <div
              class="p-4 absolute bg-colorCream w-full h-full opacity-0 group-hover:opacity-100 top-0 left-0 transition duration-500 ease-curve max-md:hidden"
            >
              <video
                playsinline="playsinline"
                loop="loop"
                autoplay=""
                muted="muted"
                class="h-full w-full object-cover object-left rounded-xl lg:rounded-2xl overflow-hidden"
                data-lazyvids="loaded"
                preload="metadata"
                aria-label="Skinkind Face Oil"
                poster="//kitskinkind.com.au/cdn/shop/products/be42e915c5c04abbb99c17cc8c9514de.thumbnail.0000000_small.jpg?v=1657537513"
              >
                <source
                  src="https://cdn.shopify.com/videos/c/vp/be42e915c5c04abbb99c17cc8c9514de/be42e915c5c04abbb99c17cc8c9514de.HD-1080p-7.2Mbps.mp4"
                  type="video/mp4"
                />
                <img src="./assets/1a.png" />
              </video>
            </div>
          </div>
        </a>

        <div
          data-info-panel=""
          class="card-product__info-panel p-4 absolute z-[2] bg-colorRed text-colorWhite top-0 left-0 bottom-0 right-0 sm:top-4 sm:left-4 sm:bottom-4 sm:right-4 transition duration-500 ease-curve rounded-xl flex flex-col justify-center opacity-0 invisible text-xs"
        >
          <div>
            <p>Suited for:</p>
            <p>All skin types.</p>
          </div>

          <div>
            <p>Application:</p>
            <p>2-5 drops daily, AM + PM.</p>
          </div>

          <div>
            <p>Benefits:</p>
            <p>Rebalance stressed skin.</p>
          </div>
        </div>
        <button
          type="button"
          data-info-toggle=""
          aria-expanded="false"
          aria-controls="info-panel-7278142161085"
          class="card-product__info-toggle absolute z-[3] top-2 right-2 sm:top-6 sm:right-6 w-5 h-5 rounded-full bg-transparent text-colorRed border border-colorRed text-xs hover:bg-colorRed hover:text-colorWhite hover:border-colorRed"
        >
          i
        </button>

        <product-form
          class="absolute lg:opacity-0 lg:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 bottom-0 w-full p-4 lg:p-8 z-[1] transition ease-curve duration-700"
          ><form>
            <input type="hidden" name="" value="product" /><input
              type="hidden"
              value="✓"
            /><input
              type="hidden"
              name="id"
              value="42071703191741"
            />
            <button
              type="submit"
              name="add"
              class="button button--full-width !text-sm !border !border-solid !border-colorRed bg-transparent text-colorRed lg:text-colorWhite lg:!bg-colorRed hover:lg:!bg-transparent hover:lg:!text-colorRed !px-3"
            >
              Add to Cart</button
            ><input type="hidden" value="7278142161085" /><input
              type="hidden"
            /></form></product-form
      ></card-product-media>
      <div class="relative z-0 p-6 pb-20 lg:p-6 grow flex flex-col">
        <span
          class="absolute z-0 top-0 w-full left-0 h-full bg-colorCream group-hover:translate-y-0 rounded-b-xl lg:-translate-y-full transition duration-500 ease-in-out"
        ></span>
        <a
          class="flex flex-col justify-center text-center gap-1 grow"
          href="/"
        >
          <div class="relative text-xs uppercase">
            Skinkind Face Oil
          </div>
          <span class="relative text-colorGrey text-xs uppercase"
            >30ML / 1.01 FL. OZ</span
          >
          <div class="relative mt-auto pt-3 text-xs uppercase">
            <div class="price">$42</div>
          </div>
        </a>
      </div>
    </div>
  `;

    uiSectionList.appendChild(li);
  });
}

createUISections();
