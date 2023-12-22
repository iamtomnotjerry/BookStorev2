print('Enter number elements separated by space')
string_numbers = input()

def convert_to_array(string_numbers):
    array_string_numbers = string_numbers.split()
    array_numbers = [int(i) for i in array_string_numbers ]
    return array_numbers

def largest_number(array_numbers):
    max = array_numbers[0]
    for i in array_numbers:
        if i > max:
            max = i
    return max

def array_prime_number(array_numbers):
    primes = []
    for num in array_numbers:
        if num > 1:
            for i in range(2, int(num**0.5)+1):
                if (num%i) ==0:
                    break
            else: 
                primes.append(num)
    return primes
                
def sum_of_primes(primes):
    return sum(primes)

def positions_even_value(array_numbers):
    positions_index = []
    for i in range(len(array_numbers)):
        if array_numbers[i] %2 == 0:
            positions_index.append(i)    
    return positions_index


array_numbers = convert_to_array(string_numbers)
largest_N = largest_number(array_numbers)
array_prime = array_prime_number(array_numbers)
sum_primes = sum_of_primes(array_prime)
positions_even = positions_even_value(array_numbers)

print(f'Array of number elements:{array_numbers}')
print(f'Largest number in array numbers: {largest_N}')
print(f'array of all prime value: {array_prime}')
print(f'sum of all primes in array: {sum_primes}')
print(f'all positions of even value in array by index: {positions_even}')


