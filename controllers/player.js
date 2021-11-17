var player = require('../models/player'); 
 
// List of all Players 
exports.player_list = async function(req, res) { 
    try{ 
        thePlayers = await player.find(); 
        res.send(thePlayers); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
};  

// VIEWS 
// Handle a show all view 
exports.player_view_all_Page = async function(req, res) { 
    try{ 
        thePlayers = await player.find(); 
        res.render('player', { title: 'Player Search Results', results: thePlayers }); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
 

// List of all Player
exports.player_list = function(req, res) { 
    res.send('NOT IMPLEMENTED: Player list'); 
}; 
 
// for a specific Player. 
exports.player_detail = async function(req, res) { 
    console.log("detail"  + req.params.id) 
    try { 
        result = await player.findById( req.params.id) 
        res.send(result) 
    } catch (error) { 
        res.status(500) 
        res.send(`{"error": document for id ${req.params.id} not found`); 
    } 
}; 
 
// Handle Player create on POST. 
exports.player_create_post = async function(req, res) { 
    console.log(req.body) 
    let document = new player(); 
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {"player_name":"Lebron James", "player_number":6, "player_team":"Lakers"} 
    document.player_name = req.body.player_name; 
    document.cost = req.body.player_number; 
    document.size = req.body.player_team; 
    try{ 
        let result = await document.save(); 
        res.send(result); 
    } 
    catch(err){ 
        res.status(500); 
        res.send(`{"error": ${err}}`); 
    }   
}; 
 
// Handle Costume delete on DELETE. 
exports.player_delete = async function(req, res) { 
    console.log("delete "  + req.params.id) 
    try { 
        result = await player.findByIdAndDelete( req.params.id) 
        console.log("Removed " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": Error deleting ${err}}`); 
    } 
};
 
//Handle player update form on PUT. 
exports.player_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await player.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.player_name)  
               toUpdate.player_name = req.body.player_name; 
        if(req.body.player_team) toUpdate.player_team = req.body.player_team; 
        if(req.body.player_number) toUpdate.player_number = req.body.player_number; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
}; 

// Handle a show one view with id specified by query 
exports.player_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await player.findById( req.query.id) 
        res.render('playerdetail',  
{ title: 'Player Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for creating a palyer. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.player_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('playercreate', { title: 'Player Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

// Handle building the view for updating a player. 
// query provides the id 
exports.player_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await player.findById(req.query.id) 
        res.render('playerupdate', { title: 'Player Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 