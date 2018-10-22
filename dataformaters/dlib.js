var dlib_header = `<?xml version='1.0' encoding='ISO-8859-1'?>
<?xml-stylesheet type='text/xsl' href='image_metadata_stylesheet.xsl'?>
<dataset>
<name>dlib face detection dataset generated by ImgLab</name>
<comment>
    This dataset is manually crafted or adjusted using ImgLab web tool
    Check more detail on https://github.com/NaturalIntelligence/imglab
</comment>
<images>`;

/*var dlib_data = "  <image file='#FILENAME#'>"
    
               +"  </image>"
var dlib_box_data = +"    <box top='130' left='129' width='92' height='91'/>"*/
var dlib_footer = "</images>"
             +"</dataset>";

//create face data xml file for dlib
//face data xml file can have data for multiple images
//for each image there can be multiple labelled box
//each labelled box can have multiple feature points called parts
function toDlibXML(imgs){
    var imgXMLStr = "";
    var img_keys = Object.keys(imgs);
    for(var img_i in img_keys){
        var imgName = img_keys[ img_i] ;
        var img = imgs [ imgName ];
        imgXMLStr += "\t<image file='"+ imgName +"'>\n";
        var shapes = img.shapes;
        //Add boxes
        for(var shape_i in shapes){
            var box = shapes [ shape_i ].bbox;
            imgXMLStr += "\t\t<box top='"+box.y+"' left='"+box.x+"' width='"+box.w+"' height='"+box.h+"'>\n";
            imgXMLStr += "\t\t\t<label>"+ shapes [ shape_i ].category +"</label>\n";
            //Add points
            var fPoints = shapes [ shape_i ].featurePoints;
            for(var fPoint_i in fPoints){
                var fPoint = fPoints [ fPoint_i ];
                //TODO: pad fPoint_i
                imgXMLStr += "\t\t\t<part name='"+ fPoint_i +"' x='"+ Math.floor(fPoint.x)+"' y='"+ Math.floor(fPoint.y) +"'/>\n";
            }
            imgXMLStr += "\t\t</box>\n"
        }
        imgXMLStr += "\t</image>\n";
    }

    return dlib_header + imgXMLStr + dlib_footer;
}

/*PTS file contains landmark points location without label and of single label box only  */
function toDlibPts(shape){
    var data = "version: 1\n"
            +"n_points:  "+shape.featurePoints.length+"\n"
            +"{\n";
    var l = shape.bbox.x, t = shape.bbox.y;
    for(var fp_id=0; fp_id < shape.featurePoints.length; fp_id++){
        data += Math.floor(shape.featurePoints[ fp_id ].x) + " " + Math.floor(shape.featurePoints[ fp_id ].y) + "\n";
    }

    data += "}";

    return data;
}
