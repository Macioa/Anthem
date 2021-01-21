export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        this.items = this.items.map(({name, sellIn, quality})=>{
            let qualityDelta = (sellIn>0) ? -1 : -2 // Quality Degredation Rate
            let sellInDelta = -1 // SellIn Days Rate
            switch(name){
                case 'Aged Brie':
                    qualityDelta = 1
                    break
                case 'Sulfuras, Hand of Ragnaros':
                    qualityDelta = 0
                    sellInDelta = 0
                    break
                case 'Backstage passes to a TAFKAL80ETC concert':
                    qualityDelta = 1
                    if (sellIn <= 10) qualityDelta++
                    if (sellIn <= 5) qualityDelta++
                    if (sellIn <= 0) qualityDelta = -quality
                    break
            }
            sellIn += sellInDelta
            quality += qualityDelta
            quality = Math.max(quality,0)
            quality = Math.min(quality,50)
            return new Item(name, sellIn, quality)
        })
        return this.items;
    }
}
