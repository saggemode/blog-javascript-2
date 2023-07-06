import Product from '../../../models/Product';
import db from '../../../utils/db';


const handler = async (req, res) => {
  await db.connect();
  const images = await Product.find().distinct('image');
  await db.disconnect();
  res.send(images);
};

export default handler;