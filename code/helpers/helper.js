Date.prototype.addDays = function(days)
{
  var dat = new Date(this.valueOf())
  dat.setDate(dat.getDate() + days);
  return dat;
}

Date.prototype.datestring = function()
{
  var dt = new Date(this.valueOf())
  var year = dt.getFullYear()
  var month = ('0' + (dt.getMonth()+1)).slice(-2)
  var day = ('0' + dt.getDate()).slice(-2)
  return day + "/" + month + "/" + year;
}

exports = datefromDDMMYY = function(str)
{
  var parts = str.split("/")
  return new Date(parts[2],parseInt(parts[1])-1, parts[0])
}

Array.prototype.shuffle = function() {
  var i = this.length, j, tempi, tempj;
  if ( i == 0 ) return this;
  while ( --i ) {
     j       = Math.floor( Math.random() * ( i + 1 ) );
     tempi   = this[i];
     tempj   = this[j];
     this[i] = tempj;
     this[j] = tempi;
  }
  return this;
}

Array.prototype.chunks = function(n) {
    if ( !this.length ) {
        return [];
    }
    return [ this.slice( 0, n ) ].concat( this.slice(n).chunks(n) );
};

exports = formatQuestion = function(str, orgname)
{
  var q = str
  q = q.replace("{organisation}", orgname)
    
  return q
}

exports = guid = function() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    var thisGuid = (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    //sys.puts(thisGuid);
    return thisGuid;
}

exports = randomFromInterval = function(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

exports = getDefaultDimensions = function(questions){
  return _.pluck(getDefaultQuestions(questions), 'section')
}

exports = getDefaultQuestions = function(allquestions){
  return _.where(allquestions, {"isdefault": true})
}