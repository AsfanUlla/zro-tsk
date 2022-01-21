const {Agency, Client} = require("./model");

const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({"success": true});
});

router.post("/create", (req, res) => {
    const agency = new Agency(req.body.agency);
    agency.save((err, agency) => {
        if (err) {
            res.json({"error": err});
        }
        req.body.client.agency_id = agency._id.toString()
        const client = new Client(req.body.client);
        client.save((err, client) => {
            if (err){
                res.json({"error": err});
            }
            res.json(client);
        });
    });
});

router.put("/update/:client_id", (req, res) => {
    Client.findOneAndUpdate(
        {
            _id: req.params.client_id
        },
        {
            $set: req.body.client,
        },
        {
            new: true
        },
        (err, Client) => {
            if (err) {
                res.json({"error": err});
            } else res.json(Client);
        }
    );
});

router.get("/top", (req, res) => {
    Client.find({}, null, {sort: {total_bill: -1}}, (err, client) => {
        if (err) {
            res.json({"error": err});
        }
        const agency = Agency.findById(
            client[0].agency_id,
            {
                name: 1
            },
            (err, agency) => {
                if(err){
                    res.json({"error": err});
                }
                var data = {
                    client_name: client[0].name,
                    total_bill: client[0].total_bill,
                    agency_name: agency.name
                }
                res.json(data);
            }
        );
    });
});

module.exports = router;
