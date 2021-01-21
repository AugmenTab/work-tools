# Aponia Work Tools

## Overview

A suite of browser-based tools made for a former employer. Each was written in JavaScript, and was made so that it could be saved as a bookmarked page for easy access by every employee.

## Tools

Each of the tools is using HTML, CSS (Grid), and JavaScript. Most were built long before I knew React.js or Elm even existed, and were done either to the specifications and requests of my then-employer, or as a proof of concept.

### Aponia

Meant as the flagship of sorts, Aponia was named for the Epicurean principle of aponia, the absence of pain. I found that to be fitting, as it was intended to solve a major pain point: at the time, there was no single source of collated information on clients and contact information that all of the major customer-facing departments could use. Aponia uses a regular expression to filter a list of clients based on their unique company-assigned code, then displays the exact match and provides all of that information, switching between department-specific details with a single click.

To demonstrate the tool, search for the code "P0574."

### OBD-II

One of the tools requested by my peers was a fast way to look up OBD-II codes. It uses a similar filtering technique to Aponia, and a planned update was to expand each entry to include more specific manufacturer-based information. An example of this can be seen when searching for code "P1441." This tool never moved beyond the proof of concept phase, but despite that, is fully functional. It's the only tool in this list that hasn't been modified from the original to include fake information for demonstrative purposes.

### Glass

This tool was made as an attempt to optimize which external clients would be selected to perform a specific job. One of many services my former employer offered was windshield warranty contracts. This tool held a list of repair shops we worked with, along with their addresses and their cost per mile to travel. It then used the [Google Maps API](https://developers.google.com/maps/documentation) to calculate the distance from the repair address to the each shop, and calculated the cost for them to travel. It would display the repair shop with the lowest fee based on distance, along with their contact information.

To demonstrate the tool, enter "6640 Indian School Rd NE 87110" as the search address. It's the location of the only Ruth's Chris Steakhouse in Albuquerque.

### Employee-Lookup

When I worked there, we used Outlook as the contact list. Unfortunately, this meant we were dependent on the IT department at the parent company overseas to update information correctly and keep the address book organized. Not one to hold my breath, I made a tool that adapted that same regex filtering code from before to a list of employees and displayed anything that matched by name, department, title, and other details. It was also able to further filter matches to include only speakers of Spanish.

This had the highest number of planned improvements and expansions:

* It was going to be slotted into the sidebar in a single page application version of the whole suite so that it was always available without requiring navigating to it.
* It was going to include a floor plan of the office, and would highlight the cubicle location of any employee or provide the employee information for any clicked cubicle. Included in this would be networking information for the IT department to reference without having to go to the cubicle.
* It was going to be able to generate emails to an entire department, or even every employee with a specific title, since that feature in Outlook was also not useful due to the disorganization.

These additions were not implemented prior to my leaving to attend the Java + Android bootcamp at CNM Ingenuity Deep Dive. I do intend to revisit them some day, but for now, other projects have claimed my attention.
