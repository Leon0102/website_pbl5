const notFound = (req, res) => res.status(404).render('error/error404',{ showTitle: true });

module.exports = notFound