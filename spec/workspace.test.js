// describe('Workspace', function() {
//   beforeEach(function(){
//       this.viewer = {};
//       this.viewerDiv = jQuery('<div>');
//       // spyOn(Mirador.Workspace.prototype, 'calculateLayout').and.returnValue();
//   });
// 
//   it('should have three siblings instead of two', function() {
//       this.workspace = new Mirador.Workspace({
//         parent:                     this.viewer, //viewer
//         appendTo: this.viewerDiv,
//         layoutDescription: Mirador.layoutDescriptionFromGridString('1x2')
//       });
//       expect(this.workspace.layoutDescription.children.length).toEqual(2);
//       expect(this.workspace.slots.length).toEqual(2);
//       
//       this.workspace.splitRight(this.workspace.slots[0]);
//       
//       expect(this.workspace.layoutDescription.children.length).toEqual(3);
//       expect(this.workspace.slots.length).toEqual(3);
//   });
//   
//   it('should have three siblings instead of two', function() {
//       this.workspace = new Mirador.Workspace({
//         parent:                     this.viewer, //viewer
//         appendTo: this.viewerDiv,
//         layoutDescription: Mirador.utils.layoutDescriptionFromGridString('1x1')
//       });
//   });
// 
// });
