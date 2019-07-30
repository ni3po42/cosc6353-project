const quoteRepo = require("../repositories/QuoteRepo");
const profileRepo = require("../repositories/ProfileRepo");
const mathUtil = require("common/math");

const currentPricePerGallon = 1.5;
const inStateLoadFactor = .02;
const outStateLoadFactor = .04;
const newClientHistoryFactor = .0;
const existingClientHistoryFactor = .01;

const smallDeliveryFactor = .03;
const largeDeliveryFactor = .02;

const companyProfitFactor = .1;
const summerRateFactor = .04;
const nonSummerRateFactor = .03;

const summerMonths = [6,7,8];

async function PredictPrice(accountId, quoteRequest){
    
    const quoteCount = await quoteRepo.GetQuoteCount(accountId);
    const profile = await profileRepo.GetProfile(accountId);
    
    const locationFactor = profile.state === "TX" ? inStateLoadFactor : outStateLoadFactor;
    const rateHistoryFactor = quoteCount === 0 ? newClientHistoryFactor : existingClientHistoryFactor;
    const gallonsRequestedFactor = quoteRequest.gallonsRequested > 1000 ? largeDeliveryFactor : smallDeliveryFactor;
    const rateFluctuationFactor = summerMonths.indexOf(new Date(quoteRequest.deliveryDate).getMonth() + 1) >= 0 ? summerRateFactor : nonSummerRateFactor;
    const margin = currentPricePerGallon * (locationFactor - rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor + rateFluctuationFactor);
    
    return mathUtil.round(currentPricePerGallon + margin, 2);
}

module.exports = {PredictPrice};