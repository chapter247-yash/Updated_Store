const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
const Marine = mongoose.model('Marine');

module.exports.addMarine = async (req, res) => {
        console.log(req.body);
        var marine = new Marine();
        marine.model = req.body.model,
        marine.image = req.body.image,
        marine.description = req.body.description,
        marine.date = req.body.date,
        // marine.time = req.body.time,
        marine.price = req.body.price,
        marine.size = req.body.size,
        marine.speed = req.body.speed,
        marine.engine= req.body.engine,
        marine.maxperson = req.body.maxperson
        let response = await marine.save()
        if (response.err) 
            return res.status(404).json({ status: false, message: 'Failed to add Marine' }); 
        else
            return res.status(200).json({ response: response});
        }

module.exports.getMarine = async(req, res) => {
        try{
            let response = await Marine.find()
        if (response.err)
            return res.status(404).json({ status: false, message: 'Failed to retrive details' }); 
        else       
            return res.status(200).json({response : response});
        } 
        catch(error){
    }
}
   
module.exports.getbyIdMarine = async (req, res) => {
    console.log(req.params.id)
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).json(`No marine with given id : ${req.params.id}`);

    let response = await Marine.findById({_id:req.params.id})
        if (response.err)
            return res.status(404).json({ status: false, message: 'Failed to retrive details' }); 
        else       
            return res.status(200).json({response : response});
}  

module.exports.deletebyIdMarine = async (req, res) => {
    console.log(req.params.id)
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).json(`No marine with given id : ${req.params.id}`);

    let response = await Marine.findByIdAndRemove({_id:req.params.id})
        if (response.err)
            return res.status(404).json({ status: false, message: 'Failed to retrive details' }); 
        else       
            return res.status(200).json({response : response});
}

// class Marine {
    module.exports.editbyIdMarine = async (req, res) => {
        console.log(req.body); 
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);
            var marine = new Marine();
            marine.name = req.body.name,
            marine.model = req.body.model,
            marine.description = req.body.description,
            marine.size = req.body.size,
            marine.speed = req.body.speed,
            marine.maxperson = req.body.maxperson,
            marine.price = req.body.price
            let response = await Marine.findOneAndUpdate({ _id: req.params.id },{ "$set": { "name":  marine.name,
            "model": marine.model, "description": marine.description, "size":marine.size,
            "speed": marine.speed,"maxperson": marine.maxperson,"price": marine.price}});
            try{
            if (response.err)
                return res.status(404).json({ status: false, message: 'Failed to retrive details' }); 
            else       
                return res.status(200).json({response});
            }
            catch(error){
            }
        }
// }

// module.exports = {
//     Marine
// }