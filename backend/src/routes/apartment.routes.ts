import express from 'express';
import { Apartment } from '../models/apartment.model';

const router = express.Router();

router.get('/', async (_req, res) => {
  const apartments = await Apartment.find();
  res.json(apartments);
});

router.get('/:id', async (req, res) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) return res.status(404).send('Not found');
  res.json(apartment);
});

router.post('/', async (req, res) => {
  const newApartment = new Apartment(req.body);
  await newApartment.save();
  res.status(201).json(newApartment);
});
router.put('/:id', async (req, res) => {
  // try {
    const updatedApartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedApartment);
  // } catch (err) {
    // res.status(500).json({ error: 'Failed to update apartment' });
  // }
});

// Delete Apartment
router.delete('/:id', async (req, res) => {
  // try {
    await Apartment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Apartment deleted' });
  // } catch (err) {
  //   res.status(500).json({ error: 'Failed to delete apartment' });
  // }
});

router.delete('/',async (req,res) => {
  await Apartment.deleteMany({});
  res.status(200).json({ message: 'All apartments deleted' });
});

router.post('/bulk', async (req, res) => {
    const apartments = req.body;
    if (!Array.isArray(apartments)) {
      return res.status(400).json({ message: 'Data must be an array of apartments' });
    }

    await Apartment.insertMany(apartments);
    res.status(200).json({ message: 'Bulk insert successful' });
});
  
export default router;
