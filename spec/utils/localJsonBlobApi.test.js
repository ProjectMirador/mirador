describe('LocalJsonBlobApi', function () {
    BogusStorage = function() {
        this.data = {};
    };
    BogusStorage.prototype = {
        setItem: function(k, v) {
            this.data[k] = v;
        },
        getItem: function(k) {
            return this.data[k];
        }
    };
    
    
    var myWindow = {
        "bogusStorage": new BogusStorage()
    };
    
    var dummyBlobs = {
        a: {
            "waahoo": 5
        },
        b: {
            "woohah": "super foobar"
        }
    };

    var localBlob;
    beforeEach(function() {
        localBlob = new Mirador.LocalJSONBlobAPI({
            storage: myWindow.bogusStorage
        });
    });
    
    it('readSync', function () {
        myWindow.bogusStorage.setItem('ABC', JSON.stringify(dummyBlobs.a));
        expect(localBlob.readSync('ABC')).toEqual(dummyBlobs.a);
    });
    
    it('save', function () {
        var promise = null,
            savedKey = "";
        (promise = localBlob.save(dummyBlobs.b)).done(function(k) {
            savedKey = k;
        });
        expect(typeof promise).toBe('object');
        expect(savedKey).not.toEqual("");
        expect(myWindow.bogusStorage.getItem(savedKey)).toEqual(JSON.stringify(dummyBlobs.b));
    });
});
