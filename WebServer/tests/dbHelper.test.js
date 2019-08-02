const { MongoClient, ObjectID } = require('mongodb');
const config = require("../db-config.js");

const { FindOne, Insert, Update } = require("../repositories/dbHelper.js");

jest.mock("mongodb" , ()=>({
    MongoClient : {
        connect : jest.fn()
    },
    ObjectID : (id)=> id
}));


jest.mock("../db-config.js" , ()=>({
    "Host": "host",
    "Port": 12345,
    "Name": "db",
    "UserName": "user",
    "Password": "pass"
}));

describe("dbHelper tests", ()=>{
    
    var server;
    var db;
    var collection;
        
    beforeEach(()=>{
        MongoClient.connect.mockClear();
        server = {
                close : jest.fn(),
                db : jest.fn()
            };
            db = {
                collection : jest.fn()
            };
            collection = {
                findOne : jest.fn(),
                insert : jest.fn(),
                updateOne : jest.fn()
            };
            server.db.mockReturnValue(db);
            db.collection.mockReturnValue(collection);
    });
    
    it("can load the helper functions", ()=>{
        expect(FindOne).toBeDefined();
        expect(Insert).toBeDefined();
        expect(Update).toBeDefined();
    })
    
    describe("Find one tests", ()=>{
        
        it("can connect and find one", async ()=>{
            var doc = {};
            MongoClient.connect = jest.fn((url, options, handler)=>{
                handler(null, server);
            });
            
            collection.findOne = jest.fn((query, options, handler)=>{
                expect(query).toMatchObject({id: 1});
                handler(null, doc);
            });
            
            var result = await FindOne({id : 1}).catch(r=>r);
            
            //assert
            expect(MongoClient.connect).toHaveBeenCalled();
            expect(collection.findOne).toHaveBeenCalled();
            expect(server.close).toHaveBeenCalled();
            expect(result).toBe(doc);
        });
        
        it("can handle connect error", async ()=>{
            
            //act
            var task = FindOne({}).catch(r=>r);
            
            var handler = MongoClient.connect.mock.calls[0][2];
            handler("an error", server);
            var result = await task;
            
            //assert
            expect(result).toBe("an error");
            expect(server.close).toHaveBeenCalled();
        });
        
        it("can handle find one error", async ()=>{
            var doc = {};
            MongoClient.connect = jest.fn((url, options, handler)=>{
                handler(null, server);
            });
            
            collection.findOne = jest.fn((query, options, handler)=>{
                expect(query).toMatchObject({id: 1});
                handler("another error", doc);
            });
            
            var result = await FindOne({id : 1}).catch(r=>r);
            
            //assert
            expect(server.close).toHaveBeenCalled();
            expect(result).toBe("another error");
        });
        
    });
    
    describe("Insert tests", ()=>{
        
        it("can connect and insert one", async ()=>{
            var doc = {
                id : 1
            };
            MongoClient.connect = jest.fn((url, options, handler)=>{
                handler(null, server);
            });
            
            collection.insert = jest.fn((obj, handler)=>{
                expect(obj).toMatchObject(doc);
                handler(null, doc);
            });
            
            var result = await Insert(doc).catch(r=>r);
            
            //assert
            expect(MongoClient.connect).toHaveBeenCalled();
            expect(collection.insert).toHaveBeenCalled();
            expect(server.close).toHaveBeenCalled();
            expect(result).toBe(doc);
        });
        
        it("can handle connect error", async ()=>{
            
            //act
            var task = Insert({}).catch(r=>r);
            
            var handler = MongoClient.connect.mock.calls[0][2];
            handler("an error", server);
            var result = await task;
            
            //assert
            expect(result).toBe("an error");
            expect(server.close).toHaveBeenCalled();
        });
        
        it("can handle insert one error", async ()=>{
            var doc = {
                id : 1
            };
            MongoClient.connect = jest.fn((url, options, handler)=>{
                handler(null, server);
            });
            
            collection.insert = jest.fn((obj, handler)=>{
                handler("an error", doc);
            });
            
            var result = await Insert(doc).catch(r=>r);
            
            //assert
            expect(server.close).toHaveBeenCalled();
            expect(result).toBe("an error");
        });
    });
    
    describe("Update tests", ()=>{
        
        it("can connect can update one", async ()=>{
            var doc = {
                val : 2
            };
            
            var query = {
                id : 1
            };
            
            MongoClient.connect = jest.fn((url, options, handler)=>{
                handler(null, server);
            });
            
            collection.updateOne = jest.fn((q, d, handler)=>{
                expect(q).toMatchObject(query);
                expect(d).toMatchObject(doc);
                handler(null, doc);
            });
            
            collection.findOne = jest.fn((q, handler)=>{
                expect(q).toMatchObject(query);
                handler(null, doc);
            });
            
            var result = await Update(query, doc).catch(r=>r);
            
            //assert
            expect(MongoClient.connect).toHaveBeenCalled();
            expect(collection.updateOne).toHaveBeenCalled();
            expect(result).toBe(doc);
            expect(server.close).toHaveBeenCalled();
            
        });
        
        it("can handle connect error", async ()=>{
            
            //act
            var task = Update({}, {}).catch(r=>r);
            
            var handler = MongoClient.connect.mock.calls[0][2];
            handler("an error", server);
            var result = await task;
            
            //assert
            expect(result).toBe("an error");
            expect(server.close).toHaveBeenCalled();
        });
        
        it("can handle update error", async ()=>{
            var doc = {
                val : 2
            };
            
            var query = {
                id : 1
            };
            MongoClient.connect = jest.fn((url, options, handler)=>{
                handler(null, server);
            });
            
            collection.updateOne = jest.fn((q,d, handler)=>{
                handler("an error", doc);
            });
            
            var result = await Update(query, doc).catch(r=>r);
            
            //assert
            expect(server.close).toHaveBeenCalled();
            expect(result).toBe("an error");
        });
        
        it("can handle update other error", async ()=>{
            var doc = {
                val : 2
            };
            
            var query = {
                id : 1
            };
            
            MongoClient.connect = jest.fn((url, options, handler)=>{
                handler(null, server);
            });
            
            collection.updateOne = jest.fn((q, d, handler)=>{
                handler(null, doc);
            });
            
            collection.findOne = jest.fn((q, handler)=>{
                //console.log(handler);
                handler("an error");
            });
            
            var result = await Update(query, doc).catch(r=>r);
            
            //assert
            expect(result).toBe("an error");
            expect(server.close).toHaveBeenCalled();
            
        });
    });
    
});