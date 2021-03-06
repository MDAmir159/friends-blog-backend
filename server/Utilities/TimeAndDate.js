const exportObjects = {
    myFormattedTime : function(params) {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm ;
        return strTime;
    }
}
module.exports = exportObjects