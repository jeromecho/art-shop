#! /usr/bin/env node 
// USE TO POPULATE DATABASE WITH DUMMY VALUES
const ArtPiece = require('./models/artpiece');
const ArtPieceInstance = require('./models/artpieceinstance');
const Painter = require('./models/painter');
const Category = require('./models/category');
const fs = require('fs');
const async = require('async');
const mongoose = require('mongoose');
require('dotenv').config();

// GET RID OF COMMENT () TO CALL FUNCTION

mongoose.connect(process.env.MONGODB_URI);

(async function () {
    const painter_1 =  new Painter({
        name: 'Vincent Van Gogh', 
        description: 'A famous dutch artist. Known worldwide for his Starry Night', 
        dateOfBirth: new Date('1853-03-30'), 
        dateOfDeath: new Date('1890-07-29'), 
        img: `https://www.biography.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY2NTIzMzc4MTI2MDM4MjM5/vincent_van_gogh_self_portrait_painting_musee_dorsay_via_wikimedia_commons_promojpg.jpg`, 
    })

    // await ?
    const category_1 = new Category({
        name: 'Impressionism', 
        description: `A style or movement in painting originating in France 
        in the 1860s, characterized by a concern with depicting the visual
        impression of the moment, especially in terms of the shifting effecti
        of light and color.`, 
    });

    const artpieceinstance_1 = new ArtPieceInstance({
        dateMade: new Date('1885-04-01'),
        status: 'Available',
        genuine: 'Genuine',
        price: 17000,
        productNumber: 'LNJI8901'
    })

    await async.parallel([
        function (callback) {
            painter_1.save(callback);
        },
        function (callback) {
            category_1.save(callback);
        },
        function (callback) {
            artpieceinstance_1.save(callback);
        },
    ], () => {})

    const artpiece_1 = new ArtPiece({
        name: 'The Potato Eaters', 
        description: `One of Gogh&#39;s masterpieces. A realistic depiction of
            peasant life`, 
        image: `https://upload.wikimedia.org/wikipedia/commons/b/b1/Van-willem-vincent-gogh-die-kartoffelesser-03850.jpg`,
        categories: [ category_1._id ], 
        instances: [ artpieceinstance_1._id ], 
        painter: painter_1._id, 
    })

    artpiece_1.save(err => {
        if (err) { return err }
        console.log('Success!')
        return;
    })
})();


