class Fraction:
    def __init__(self,numerator,denominator=1):
        if denominator == 0:
            raise ValueError("Denominator cannot be zero")
        self.fraction = f'{numerator}/{denominator}'
        self.numerator = numerator
        self.denominator = denominator

    def __str__(self):
        return self.fraction
    
    def __add__(self,other):
        new_numerator = self.numerator * other.denominator + other.numerator* self.denominator
        new_denominator = self.denominator * other.denominator
        return Fraction(new_numerator,new_denominator)


F1 = Fraction(1,2) 
F2 = Fraction(1,3) 
print(F1+F2)