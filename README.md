# Employee Metrics Generator

This repository contains a script that generates random employee data and pushes it to Prometheus Pushgateway. The data is visualized on a Grafana dashboard.

## Features
- Random generation of employee names, surnames, and levels.
- Integration with Prometheus Pushgateway for data collection.
- Support for Grafana visualization.

## Prerequisites
1. **Node.js**: Ensure you have Node.js installed on your system.
2. **Prometheus Pushgateway**: Running at `http://localhost:9091`.
3. **Grafana**: Dashboard configured to visualize the employee data.

## Installation
1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install axios
   ```

## Usage
1. Start Prometheus Pushgateway:
   ```bash
   ./pushgateway
   ```
2. Run the script:
   ```bash
   node employee.js
   ```
3. Import the provided `zadanie1.json` file into Grafana to view the dashboard.

## Grafana Dashboard Configuration
Make the following adjustments in Grafana queries for proper visualization:
- **Weekly Distribution**: `avg_over_time(employee{name="$employee"}[$__interval])`
- **Weekly Chart**: `last_over_time(employee{name="$employee"}[$__interval])`
- **Percentage Calculation**: `((last_over_time(employee{day="$day", name="$employee"}[$__interval]))/8)*100`
- **8-Hour Check**: `last_over_time(employee{day="$day",name="$employee"}[$__interval])`

### Data Transformations:
- For weekly chart and 8-hour checks, apply: `limit 1`.

## Example Output
Example of pushed metrics:
```bash
# TYPE employee_info counter
employee{name="Ala", day="monday", level="junior", surname="Nowak", nationality="polish"} 6
```

## License
This project is licensed under the MIT License.
