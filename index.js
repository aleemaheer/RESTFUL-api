const Joi = require('joi');
const express = require('express');
const app = express();

// command to stop the server

app.use(express.json());

// courses
const courses =[
    {id: 1, name: 'course1'},
    {id: 2, name: 'cours2'},
    {id: 3, name: 'course3'}
]
app.get('/', (req, res) => {
    res.send("Hello world");
});

// api
app.get('/api/courses', (req, res) => {
    res.send(courses);
})

// create new course
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);

    if (result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    };
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);

})
// getting single course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`The course with the id ${req.params.id} is not found`);
    res.send(course);

});
//update course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send(`Course not found of id ${req.params.id}`);

    // Validation
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        // 400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    };
    course.name = req.body.name;
    res.send(courses);

});

// Delete course
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send(`Course not found of id ${req.params.id}`);

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));