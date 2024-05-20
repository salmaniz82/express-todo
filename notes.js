/*
    While developing APIs we often use routes name in singular and plural
    when I am viewing a single blog blogs/asdfasdfaf
    it does not make any sense to me 
*/ 
app.use(/^\/api\/todos?/, todoRoutes);


/* We can also use this approach to connect to database */

const connectDB = async () => {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
  
      console.log('MongoDB successfully connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };