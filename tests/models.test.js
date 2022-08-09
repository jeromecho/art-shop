require('dotenv').config();
const path = require('path');
const ArtPiece = require(path.join(__dirname, '../models/artpiece'));
const ArtPieceInstance = require('../models/artpieceinstance');
const Category = require('../models/category');
const Painter = require('../models/painter');
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const fs = require('fs');

jest.useFakeTimers();

beforeAll(async() => {
    // await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
});

it('saves art piece model', async () => {
    let errors = null; 
    let isSuccessful = false; 
    const exampleCategory = new Category({
        name: 'Example Category',
        description: 'Lorem ipsum',
    });
    const exampleInstance = new ArtPieceInstance({
        dateMade: new Date(),
        status: 'Available',
        genuine: 'Genuine',
        price: 150.00, 
        productNumber: '56LNOI81',
    });
    const examplePainter = new Painter({
        name: 'Immanuel Example',
        description: 'Lorem ipsum',
        dateOfBirth: new Date(),
        dateOfDeath: new Date(),
    });

    return fs.readFile(path.join(__dirname, '../img/gogh_1.jpeg'), (err, imgData) => {
        if (err) { 
            errors = err;
        }

        const exampleArtPiece = new ArtPiece({
            name: 'Example',
            description: 'World&apos;s most famous painting.',
            categories: [ exampleCategory._id ],
            image: imgData, 
            instances: [ exampleInstance._id ],
            painter: examplePainter._id,
        });

        return exampleArtPiece.save((err) => {
            if (err) { 
                errors = err;
                return;
            }
            isSuccessful = true;

            expect(errors).toBe(null);
            expect(isSuccessful).toBe(true);
            expect(1).toBe(2);
            // TODO jest test not reaching here!
        });
    });
});

