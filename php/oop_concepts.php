<?php

// ============================================================
// 1. CLASS AND OBJECT
// ============================================================

class Car {
    public string $brand;
    public string $color;
    private int $speed = 0;

    public function __construct(string $brand, string $color) {
        $this->brand = $brand;
        $this->color = $color;
    }

    public function accelerate(int $amount) {
        $this->speed += $amount;
    }

    public function getSpeed(): int {
        return $this->speed;
    }

    public function describe(): string {
        return "{$this->color} {$this->brand} going at {$this->speed} km/h";
    }
}

echo "=== Class & Object ===\n";
$car = new Car("Toyota", "Red");
$car->accelerate(60);
echo $car->describe() . "\n\n";


// ============================================================
// 2. INHERITANCE
// ============================================================

class Animal {
    public string $name;

    public function __construct(string $name) {
        $this->name = $name;
    }

    public function speak(): string {
        return "{$this->name} makes a sound.";
    }
}

class Dog extends Animal {
    public function speak(): string {
        return "{$this->name} says: Woof!";
    }
}

class Cat extends Animal {
    public function speak(): string {
        return "{$this->name} says: Meow!";
    }
}

echo "=== Inheritance ===\n";
$dog = new Dog("Bruno");
$cat = new Cat("Kitty");
echo $dog->speak() . "\n";
echo $cat->speak() . "\n\n";


// ============================================================
// 3. POLYMORPHISM
// ============================================================

class Shape {
    public function area(): float {
        return 0;
    }
}

class Circle extends Shape {
    public function __construct(private float $radius) {}

    public function area(): float {
        return pi() * $this->radius ** 2;
    }
}

class Rectangle extends Shape {
    public function __construct(private float $width, private float $height) {}

    public function area(): float {
        return $this->width * $this->height;
    }
}

echo "=== Polymorphism ===\n";
$shapes = [new Circle(5), new Rectangle(4, 6)];
foreach ($shapes as $shape) {
    echo get_class($shape) . " area: " . round($shape->area(), 2) . "\n";
}
echo "\n";


// ============================================================
// 4. ABSTRACTION
// ============================================================

abstract class Vehicle {
    abstract public function fuelType(): string;

    public function describe(): string {
        return get_class($this) . " runs on " . $this->fuelType();
    }
}

class ElectricCar extends Vehicle {
    public function fuelType(): string {
        return "Electricity";
    }
}

class PetrolBike extends Vehicle {
    public function fuelType(): string {
        return "Petrol";
    }
}

echo "=== Abstraction ===\n";
$vehicles = [new ElectricCar(), new PetrolBike()];
foreach ($vehicles as $v) {
    echo $v->describe() . "\n";
}
echo "\n";


// ============================================================
// 5. INTERFACE vs ABSTRACT CLASS
// ============================================================

// Interface — only method signatures, no properties, supports multiple
interface Printable {
    public function printInfo(): string;
}

interface Saveable {
    public function save(): string;
}

// Abstract Class — can have properties + partial implementation
abstract class Document {
    public function __construct(protected string $title) {}

    abstract public function getContent(): string;

    public function preview(): string {
        return "Preview: " . substr($this->getContent(), 0, 30) . "...";
    }
}

class Report extends Document implements Printable, Saveable {
    public function __construct(string $title, private string $body) {
        parent::__construct($title);
    }

    public function getContent(): string {
        return $this->body;
    }

    public function printInfo(): string {
        return "Printing: {$this->title}";
    }

    public function save(): string {
        return "Saving: {$this->title} to database";
    }
}

echo "=== Interface vs Abstract Class ===\n";
$report = new Report("Sales Q1", "Total revenue increased by 20% this quarter.");
echo $report->printInfo() . "\n";
echo $report->save() . "\n";
echo $report->preview() . "\n\n";


// ============================================================
// 6. TRAITS
// ============================================================

trait Logger {
    public function log(string $message): void {
        echo "[LOG] " . get_class($this) . ": $message\n";
    }
}

trait Timestamp {
    public function createdAt(): string {
        return "Created at: " . date("Y-m-d H:i:s");
    }
}

class Order {
    use Logger, Timestamp;

    public function __construct(private int $id) {}

    public function place(): void {
        $this->log("Order #{$this->id} placed.");
        echo $this->createdAt() . "\n";
    }
}

echo "=== Traits ===\n";
$order = new Order(101);
$order->place();
