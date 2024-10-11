import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export async function addAnimal(animal) {
  const created_animal = await prisma.animal.create({
    data: animal
  });
  console.log(created_animal)
  return true
}

export async function deleteAnimal(id) {
    try {
      const deletedAnimal = await prisma.animal.delete({
        where: {
          id: id,  
        },
      });
      console.log('Deleted record:', deletedAnimal);
    } catch (error) {
      console.error('Error deleting record:', error);
      return false
    }
    return true
}   


export async function updateAnimal(id, animal) {
  try {
    const updatedAnimal = await prisma.animal.update({
      where: {
        id: id,  
      },
      data: animal
    });
    console.log('Updated record:', updatedAnimal);
  } catch (error) {
    console.error('Error updating record:', error);
    return false
  }
  return true
}
export async function getAllAnimals() {
    try {
      const animals = await prisma.animal.findMany();
      console.log('All animals:', animals);
      return animals
    } catch (error) {
      console.error('Error fetching records:', error);
      return []
    }
  }
  