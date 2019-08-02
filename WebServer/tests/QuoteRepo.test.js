const {Update, FindOne, ObjectID} = require("../repositories/dbHelper.js");

const { InsertQuote, GetQuotes, GetQuoteCount } = require("../repositories/QuoteRepo");

jest.mock("../repositories/dbHelper.js" , ()=>({
    FindOne : jest.fn(),
    Update : jest.fn(), 
    ObjectID : (id)=> id
}));

describe("quote Repo tests", ()=>{
    
    var accountId = "id";
    var newQuote = {
        blah : 'blah'
    };
    
    var account = {
        quotes : [{
            totalAmount : 6,
            suggestedPrice : 2,
            gallonsRequested : 3,
            deliveryAddress : {}
        },{
            totalAmount : 6,
            suggestedPrice : 2,
            gallonsRequested : 3,
            deliveryAddress : {}
        },{
            totalAmount : 6,
            suggestedPrice : 2,
            gallonsRequested : 3,
            deliveryAddress : {}
        }],
        quoteCount : 5
    };
    
    var query = {
        pageSize : 3,
        currentPage : 1
    };
    
    beforeEach(()=>{
        FindOne.mockClear();
        Update.mockClear();
        if (newQuote.created){
            delete newQuote.created;
        }
    });
    
    it("can insert quote", async ()=>{
        
        Update.mockResolvedValue({});
        
        var result = await InsertQuote(accountId, newQuote);
        
        expect(Update).toHaveBeenCalled();
        expect(Update.mock.calls[0][0]).toMatchObject({_id: accountId});
        expect(Update.mock.calls[0][1]).toMatchObject({$push:{quotes : newQuote}, $inc:{quoteCount : 1}});
        expect(result).toBe(newQuote)
    });
    
    it("can get quote count", async ()=>{
        
        FindOne.mockResolvedValue(account);
        
        var result = await GetQuoteCount(accountId).catch(r=>r);
        
        expect(FindOne).toHaveBeenCalled();
        expect(FindOne.mock.calls[0][0]).toMatchObject({_id: accountId});
        expect(result).toBe(account.quoteCount);
    });
    
    it("handles missing account for get quote count", async ()=>{
        
        FindOne.mockResolvedValue(null);
        
        var result = await GetQuoteCount(accountId).catch(r=>r);
        
        expect(FindOne).toHaveBeenCalled();
        expect(result).toBe("Account not found.");
    });
    
    
    
    it("can get quote history", async ()=>{
        
        FindOne.mockResolvedValue(account);
        
        var result = await GetQuotes(accountId, query).catch(r=>r);
        
        expect(FindOne).toHaveBeenCalled();
        expect(FindOne.mock.calls[0][0]).toMatchObject({_id : accountId});
        expect(FindOne.mock.calls[0][1]).toMatchObject({projection : { quotes : { $slice : [ (query.currentPage - 1) * query.pageSize, query.pageSize ] }, quoteCount : 1, profile : 1  }});
        
        expect(result).toMatchObject({
           page : account.quotes.slice(0, 3),
           pageCount : 2,
           pageSize : 3,
           currentPage : 1
        });
    });
    
    it("can handle missing account for get quote history", async ()=>{
        
        FindOne.mockResolvedValue(null);
        
        var result = await GetQuotes(accountId, query).catch(r=>r);
        
        expect(FindOne).toHaveBeenCalled();
        
        expect(result).toBe("Account not found.");
    });
    
    it("can handle no quote history", async ()=>{
        
        FindOne.mockResolvedValue({ quotes : [], quoteCount : 0});
        
        var result = await GetQuotes(accountId, query).catch(r=>r);
        
        expect(FindOne).toHaveBeenCalled();
        
        expect(result).toBe("No quotes for account found.");
    });
});