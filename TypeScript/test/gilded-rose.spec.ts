import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

/*
	- All items have a SellIn value which denotes the number of days we have to sell the item
	- All items have a Quality value which denotes how valuable the item is
	- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

	- Once the sell by date has passed, Quality degrades twice as fast
	- The Quality of an item is never negative
	- "Aged Brie" actually increases in Quality the older it gets
	- The Quality of an item is never more than 50
	- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
	- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
    Quality drops to 0 after the concert
*/

describe('Gilded Rose', function () {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

//**** CORE REQ */
    it('should lower sellIn', function() {
        const gildedRose = new GildedRose([ new Item('foo', 5, 5) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
    });

    it('should lower quality', function() {
        const gildedRose = new GildedRose([ new Item('foo', 5, 5) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(4);
    });

//**** SPECIAL REQ*/
    it('should double degradation after sell date', function() {
        const gildedRose = new GildedRose([ new Item('foo', -1, 2) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
    });

    it('should not give negative quality', function() {
        const gildedRose = new GildedRose([ new Item('foo', 1, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.be.gte(0);
    });


    it('should increase aged brie quality', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(1);
    });

    it('should not raise quality over 50', function() {
        const gildedRose = new GildedRose([ new Item('foo', 5, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.be.lte(50);
    });

    it('should not alter Sulfuras quality', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 5, 5) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(5);
        expect(items[0].sellIn).to.equal(5);
    });

    describe('Backstage passes', function () {
        it("should increase quality by 2 when there are 10 days or less", function() {
            const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 5) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(7);
        });

        it("should increase quality by 3 when there are 5 days or less", function() {
            const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 5) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(8);
        });

        it("should set quality to 0 after concert", function() {
            const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50) ]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(0);
        });
    })
});
