const counterM = require('../domains/models/counter');
const express = require('express');

async function createCounter(reference, maxValue, minValue) {
    const counterDetails = { reference, counter: 0, maxValue, minValue };
    const newCounter = new counterM(counterDetails);
    await newCounter.save();
    return newCounter;
}

async function getCounter(reference) {
    const ct = await counterM.findOne({ reference: reference }).exec();
    if (!ct) {
        ct = createCounter(reference, 200, 0);
    }
    return ct;
}

async function setCounter(reference, value) {
    try {
        await counterM
            .updateOne({ reference: reference }, { counter: value })
            .exec();
    } catch (err) {
        //res.send(err.message);
    }
}

async function incCounter(reference) {
    const ct = await getCounter(reference);
    console.log(ct.counter + 1);
    setCounter(reference, ct.counter + 1);
}

async function descCounter(reference) {
    const ct = await getCounter(reference);
    setCounter(reference, ct.counter - 1);
}

async function isMax(reference) {
    const ct = await getCounter(reference);
    if (ct.maxValue && ct.counter >= ct.maxValue) {
        return ct.maxValue;
    }
    return false;
}

module.exports = {
    createCounter,
    getCounter,
    setCounter,
    isMax,
    incCounter,
    descCounter,
};
