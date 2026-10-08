namespace SatinRoad;

public class RandomNumber
{
    private Random random = new Random();

    public bool isRandomNumber()
    {
        if (random.Next(1, 100) == 1)
        {
            return true;
        }
        return false;
    }
    
}