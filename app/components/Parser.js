/**
 *
 */
class Parser {
  constructor(browser) {
    this.browser = browser;
  }

  /**
   * @param {string} page url to page for parse
   * @param {string} targetType string of the parser type to launch
   */
  async parse(page, targetTtype) {
    return this._openPage(page)
      .then((res) => {
        let result = null;

        switch (targetTtype) {
          case 'products-links':
            result = this._exactProductsLinks(res);
            break;
          case 'pages-links':
            result = this._exactPagesLinks(res);
            break;
          case 'product-props':
            result = this._getProductProperties(res);
            break;
        }

        return result;
      })
      .then((res) => {
        if (!res) {
          throw new Error(res);
        }
        const { props, page } = res;
        page.close();
        return props;
      })
  }

  _openPage(pageLink) {
    return this.browser
      .then(browser => browser.newPage())
      .then(async page => {
        await page.goto(pageLink);
        return page;
      })
  }

  async _exactProductsLinks(res) {

    const links = await res.evaluate(() => {
      const links = [];
      const spans = document.querySelectorAll('.title span[itemprop=name]');

      spans.forEach(span => {
        const hrefToProduct = span.closest('a').attributes.href.textContent;
        const baseUrl = location.origin.replace(/\/catalog\/\w*\d\S/, '');
        const href = baseUrl + hrefToProduct;
        links.push({ href });
      });

      return links;
    });

    return { props: links, page: res };
  }

  async _exactPagesLinks(res) {
    const links = await res.evaluate(() => {
      const baseUrl = `${location.origin}/catalog/`;
      const links = [baseUrl];
      const pagination = [...document.querySelectorAll('.pagination li a')];

      const filteredLinks = pagination
        .filter(link => !link.parentNode.classList.contains('next'))
        .map(link => link.attributes.href.textContent);

      const lastLinkNum = filteredLinks[filteredLinks.length - 1].split('=')[1];
      const linkWithoutNum = filteredLinks[filteredLinks.length - 1].split('=')[0];

      let i = 2; // Second page num
      for (; i <= lastLinkNum; i++) {
        const finalLink = `${location.origin}${linkWithoutNum}=${i}`;
        links.push(finalLink);
      }

      return links;
    });

    return { props: links, page: res };
  }

  async _getProductProperties(res) {

    const properties = await res.evaluate((arg) => {
      const productBlock = document.querySelector('.catalog .item');

      const images = [...productBlock.querySelectorAll('.head img')]
        .map(image => location.origin + image.getAttribute('src'));

      arg.productName = document.querySelector('h1').textContent.trim();
      arg.images = images.length > 1 ?
        images.slice(0, Math.floor(images.length / 2)) :
        images;

      arg.description = [...productBlock.querySelectorAll('[itemprop=description]')].map(el => el.textContent).join('').replace(/\s+/g, ' ').trim();

      arg.price = productBlock.querySelector('.price_val').textContent.match(/\d*\s*\d*\s*[а-яё.]*/)[0];

      const propsTable = [...productBlock.querySelectorAll('.char')];
      console.log(propsTable[0], propsTable[0].quer)
      arg.characteristics = propsTable.reduce((result, charElement, i, arr) => {
        const char = charElement.querySelector('.char_name').textContent.replace(/\s+/g, ' ').trim();
        const val = charElement.querySelector('.char_value').textContent.replace(/\s+/g, ' ').trim();

        result.push(`${char}: ${val}`);

        if (i === arr.length - 1) {
          return result.join(';\n');
        };

        return result;
      }, [])

      return arg;
    }, {})
    return { props: properties, page: res };
  }

};

module.exports = Parser;