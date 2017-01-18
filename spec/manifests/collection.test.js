describe('Collection', function() {
  beforeEach(function() {
    jasmine.getJSONFixtures().fixturesPath = 'spec/fixtures';
    this.collectionData = getJSONFixture('iiif-universe.json');
    this.server = sinon.fakeServer.create();
  });

  afterEach(function() {
    this.server.restore();
  });

  describe('init', function () {
    it('should have expected data constructed from collection content', function(done) {
      var content = { "@context": "http://www.shared-canvas.org/ns/context.json",
                      "@type": "sc:Collection",
                      "@id": "http://collections.example.com/iiif/EX/collection",
                      "label": "Book 1",
                      "manifests": []
                    };
      var collectionInstance = new Mirador.Collection(null, null, content);
      setTimeout(function () { 
        expect(collectionInstance.jsonLd.label).toEqual('Book 1');
        done(); 
      }, 0);
    });
    it('should have expected data constructed from collection URI', function(done) {
      var collectionUri = 'path/to/collection.json';
      var data = this.collectionData;

      this.server.respondWith("GET", "path/to/collection.json",
                              [ 200,
                                { "Content-Type": "application/json" },
                                JSON.stringify(data)
                              ]
                             );
      var collectionInstance = new Mirador.Collection(collectionUri);
      this.server.respond();

      expect(collectionInstance.jsonLd).toEqual(data);
      done();
    });
  });
  
  describe('getVersion for collection', function() {
    it('should return the correct values for different versions of the collection', function() {
      var content = { "@context": "http://www.shared-canvas.org/ns/context.json",
                      "@type": "sc:Collection",
                      "@id": "http://collections.example.com/iiif/EX/collection",
                      "label": "Book 1",
                      "manifests": []
                    };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getVersion()).toEqual('1');

      content = { "@context": "http://iiif.io/api/presentation/1/context.json",
                  "@type": "sc:Collection",
                  "@id": "http://collections.example.com/iiif/EX/collection",
                  "label": "Book 1",
                  "manifests": []
                };
      collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getVersion()).toEqual('1');
      content = { "@context": "http://iiif.io/api/presentation/2/context.json",
                  "@type": "sc:Collection",
                  "@id": "http://collections.example.com/iiif/EX/collection",
                  "label": "Book 1",
                  "manifests": []
                };
      collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getVersion()).toEqual('2');

      content = { "@context": "http://iiif.io/api/presentation/2.1/context.json",
                  "@type": "sc:Collection",
                  "@id": "http://collections.example.com/iiif/EX/collection",
                  "label": "Book 1",
                  "manifests": []
                };
      collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getVersion()).toEqual('2.1');
    });
  });
  
  describe('getManifestUris for collection', function() {
    it('should return manifest URIs for a collection with a \"manifests\" key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "collections": [
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ],
        "manifests": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ],
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getManifestUris()).toEqual([
        "http://example.org/iiif/book1/manifest", 
        "http://example.org/iiif/book2/manifest"
      ]);
    });
    it('should return manifest URIs for a collection with a \"members\" key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "members": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ],
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getManifestUris()).toEqual([
        "http://example.org/iiif/book1/manifest", 
        "http://example.org/iiif/book2/manifest"
      ]);
    });
    it('should return empty array for a collection without either key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "collections": [
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getManifestUris()).toEqual([]);
    });
    it('should return empty array for a collection with a \"members\" key but no manifests in it', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "members": [
          {
            "@id": "http://example.org/iiif/collection/part1",
            "@type": "sc:Collection",
            "label": "Sub Collection 1"
          },
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getManifestUris()).toEqual([]);
    });
  });
  
  describe('getManifestBlocks for collection', function() {
    it('should return manifest blocks for a collection with a \"manifests\" key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "collections": [
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ],
        "manifests": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ],
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getManifestBlocks()).toEqual([
        {
          "@id": "http://example.org/iiif/book1/manifest",
          "@type": "sc:Manifest",
          "label": "Book 1"
        },
        {
          "@id": "http://example.org/iiif/book2/manifest",
          "@type": "sc:Manifest",
          "label": "Book 2"
        }
      ]);
    });
    it('should return manifest blocks for a collection with a \"members\" key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "members": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ],
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getManifestBlocks()).toEqual([
        {
          "@id": "http://example.org/iiif/book1/manifest",
          "@type": "sc:Manifest",
          "label": "Book 1"
        },
        {
          "@id": "http://example.org/iiif/book2/manifest",
          "@type": "sc:Manifest",
          "label": "Book 2"
        }
      ]);
    });
    it('should return empty array for a collection without either key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "collections": [
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getManifestBlocks()).toEqual([]);
    });
    it('should return empty array for a collection with a \"members\" key but no manifests in it', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "members": [
          {
            "@id": "http://example.org/iiif/collection/part1",
            "@type": "sc:Collection",
            "label": "Sub Collection 1"
          },
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getManifestBlocks()).toEqual([]);
    });
  });
  
  describe('getCollectionUris for collection', function() {
    it('should return collection URIs for a collection with a \"collections\" key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "manifests": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          }
        ],
        "collections": [
          {
            "@id": "http://example.org/iiif/collection/part1",
            "@type": "sc:Collection",
            "label": "Sub Collection 1"
          },
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getCollectionUris()).toEqual([
        "http://example.org/iiif/collection/part1", 
        "http://example.org/iiif/collection/part2"
      ]);
    });
    it('should return collection URIs for a collection with a \"members\" key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "members": [
          {
            "@id": "http://example.org/iiif/collection/part1",
            "@type": "sc:Collection",
            "label": "Sub Collection 1"
          },
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getCollectionUris()).toEqual([
        "http://example.org/iiif/collection/part1", 
        "http://example.org/iiif/collection/part2"
      ]);
    });
    it('should return empty array for a collection without either key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "manifests": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getCollectionUris()).toEqual([]);
    });
    it('should return empty array for a collection with a \"members\" key but no manifests in it', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "members": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getCollectionUris()).toEqual([]);
    });
  });
  
  describe('getCollectionBlocks for collection', function() {
    it('should return collection URIs for a collection with a \"collections\" key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "manifests": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          }
        ],
        "collections": [
          {
            "@id": "http://example.org/iiif/collection/part1",
            "@type": "sc:Collection",
            "label": "Sub Collection 1"
          },
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getCollectionBlocks()).toEqual([
        {
          "@id": "http://example.org/iiif/collection/part1",
          "@type": "sc:Collection",
          "label": "Sub Collection 1"
        },
        {
          "@id": "http://example.org/iiif/collection/part2",
          "@type": "sc:Collection",
          "label": "Sub Collection 2"
        }
      ]);
    });
    it('should return collection URIs for a collection with a \"members\" key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "members": [
          {
            "@id": "http://example.org/iiif/collection/part1",
            "@type": "sc:Collection",
            "label": "Sub Collection 1"
          },
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/collection/part2",
            "@type": "sc:Collection",
            "label": "Sub Collection 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getCollectionBlocks()).toEqual([
        {
          "@id": "http://example.org/iiif/collection/part1",
          "@type": "sc:Collection",
          "label": "Sub Collection 1"
        },
        {
          "@id": "http://example.org/iiif/collection/part2",
          "@type": "sc:Collection",
          "label": "Sub Collection 2"
        }
      ]);
    });
    it('should return empty array for a collection without either key', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "manifests": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getCollectionBlocks()).toEqual([]);
    });
    it('should return empty array for a collection with a \"members\" key but no manifests in it', function() {
      var content = {
        "@context": "http://iiif.io/api/presentation/2/context.json",
        "@id": "http://example.org/iiif/collection/top",
        "@type": "sc:Collection",
        "label": "Top Level Collection for Example Organization",
        "members": [
          {
            "@id": "http://example.org/iiif/book1/manifest",
            "@type": "sc:Manifest",
            "label": "Book 1"
          },
          {
            "@id": "http://example.org/iiif/book2/manifest",
            "@type": "sc:Manifest",
            "label": "Book 2"
          }
        ]
      };
      var collectionInstance = new Mirador.Collection(null, null, content);
      expect(collectionInstance.getCollectionBlocks()).toEqual([]);
    });
  });
});