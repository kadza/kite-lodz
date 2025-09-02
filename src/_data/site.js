// Site-wide data and configuration
module.exports = {
  // Ensure HTML files are processed as Nunjucks templates
  layout: "base.html",

  // Site configuration
  title: "Kite Spots",
  description: "Kite surfing spots in Łódź region",

  // Navigation data
  navigation: {
    main: [
      { text: "Home", url: "/" },
      { text: "Jeziorsko", url: "/spots/jeziorsko/" }
    ]
  }
};