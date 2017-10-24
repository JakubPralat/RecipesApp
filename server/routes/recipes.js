var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Kuba:1234@ds125365.mlab.com:25365/myrecipes', ['recipes']);

//Get all recipes
router.get('/recipes',function(req, res, next){
    db.recipes.find(function(err, recipes){
        if(err){
            res.send(err);
        }
        res.json(recipes);
    })
});

//Get single recipe
router.get('/recipe/:id',function(req, res, next){
    db.recipes.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, recipe){
        if(err){
            res.send(err);
        }
        res.json(recipe);
    })
})

//Add recipe
router.post('/recipe',function(req, res, next){
    var recipe = req.body;
    if(!recipe.title){
        res.status(400);
        res.json({"error":"badData"});
    }
    else{
        db.recipes.save(recipe, function(err,recipe){
            if(err){
                res.send(err);
            }
            res.json(recipe);
        })
    }
})

//Delete single recipe
router.delete('/recipe/:id', function(req, res, next){
    db.recipes.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, recipe){
        if(err){
            res.send(err);
        }
        res.json(recipe);
    })
})

//Update recipe
router.put('/recipe/:id', function(req, res, next){
    var recipe = req.body;

    db.recipes.update({_id: mongojs.ObjectId(req.params.id)}, recipe, function(err, recipe){
        if(err){
            res.send(err);
        }
        res.json(recipe);
    })
})

module.exports = router;