var pageModel = function() {


    this.PageId = null;
    this.Pdate = new Date().getFullYear();
    this.breadCrumb = "";

    this.menuItems = [
        { id: 'Home', path: '/' },
        { id: 'Web Solutions', path: '/websolutions' },
        { id: 'Apps', path: '/webapps' },
        { id: 'WebGL', path: '/webgl' },
        { id: 'Contact', path: '/contact' },
    ];







};

pageModel.prototype.getCurrentPage = function(id) {


    if (id === this.PageId) {
        return true;
    } else {
        return false;
    }


};



module.exports = pageModel;