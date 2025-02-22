import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import './SearchBar.css';

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState('flights');
  const [formData, setFormData] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [valueFrom, setValueFrom] = useState('');
  const [valueTo, setValueTo] = useState('');
  const [tripType, setTripType] = useState('return');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setFormData({});
    setIsExpanded(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
  };

  const handleSearch = async () => {
    const pageMap = {
      flights: '/bookings',
      hotels: '/bookings',
      flightHotels: '/flighthotels',
      packages: '/packages',
    };

    if (activeTab === 'flights') {
      try {
        const response = await fetch(`https://api.aviationstack.com/v1/flights?access_key=0d864873390e3b105267e8b1623ad5ef&dep_iata=${formData.flyingFrom}&arr_iata=${formData.flyingTo}`);
        const data = await response.json();
        // Assuming you have a flight booking page that can handle the search results
        window.location.href = `/flights`;
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    } else {
      const queryString = new URLSearchParams(formData).toString();
      window.location.href = `${pageMap[activeTab]}?${queryString}`;
    }
  };

  const handleExpand = () => {
    if (!isMobile) {
      setIsExpanded(true);
    }
  };

  const airportOptions = [
    { value: 'JFK', label: 'John F. Kennedy International Airport' },
    { value: 'LAX', label: 'Los Angeles International Airport' },
    { value: 'ORD', label: "O'Hare International Airport" },
    { value: 'ATL', label: 'Hartsfield-Jackson Atlanta International Airport' },
    { value: 'DFW', label: 'Dallas/Fort Worth International Airport' },
    { value: 'DEN', label: 'Denver International Airport' },
    { value: 'SFO', label: 'San Francisco International Airport' },
    { value: 'SEA', label: 'Seattle-Tacoma International Airport' },
    { value: 'LAS', label: 'McCarran International Airport' },
    { value: 'MCO', label: 'Orlando International Airport' },
    { value: 'CLT', label: 'Charlotte Douglas International Airport' },
    { value: 'PHX', label: 'Phoenix Sky Harbor International Airport' },
    { value: 'IAH', label: 'George Bush Intercontinental Airport' },
    { value: 'MIA', label: 'Miami International Airport' },
    { value: 'BOS', label: 'Logan International Airport' },
    { value: 'MSP', label: 'Minneapolis-Saint Paul International Airport' },
    { value: 'DTW', label: 'Detroit Metropolitan Airport' },
    { value: 'PHL', label: 'Philadelphia International Airport' },
    { value: 'LGA', label: 'LaGuardia Airport' },
    { value: 'FLL', label: 'Fort Lauderdale-Hollywood International Airport' },
    { value: 'BWI', label: 'Baltimore/Washington International Thurgood Marshall Airport' },
    { value: 'SLC', label: 'Salt Lake City International Airport' },
    { value: 'SAN', label: 'San Diego International Airport' },
    { value: 'IAD', label: 'Washington Dulles International Airport' },
    { value: 'DCA', label: 'Ronald Reagan Washington National Airport' },
    { value: 'MDW', label: 'Chicago Midway International Airport' },
    { value: 'TPA', label: 'Tampa International Airport' },
    { value: 'PDX', label: 'Portland International Airport' },
    { value: 'HNL', label: 'Daniel K. Inouye International Airport' },
    { value: 'STL', label: 'St. Louis Lambert International Airport' },
    { value: 'BNA', label: 'Nashville International Airport' },
    { value: 'AUS', label: 'Austin-Bergstrom International Airport' },
    { value: 'MCI', label: 'Kansas City International Airport' },
    { value: 'RDU', label: 'Raleigh-Durham International Airport' },
    { value: 'SJC', label: 'San Jose International Airport' },
    { value: 'OAK', label: 'Oakland International Airport' },
    { value: 'MSY', label: 'Louis Armstrong New Orleans International Airport' },
    { value: 'CLE', label: 'Cleveland Hopkins International Airport' },
    { value: 'SMF', label: 'Sacramento International Airport' },
    { value: 'SAT', label: 'San Antonio International Airport' },
    { value: 'PIT', label: 'Pittsburgh International Airport' },
    { value: 'IND', label: 'Indianapolis International Airport' },
    { value: 'CVG', label: 'Cincinnati/Northern Kentucky International Airport' },
    { value: 'MKE', label: 'Milwaukee Mitchell International Airport' },
    { value: 'JAX', label: 'Jacksonville International Airport' },
    { value: 'OMA', label: 'Eppley Airfield' },
    { value: 'OKC', label: 'Will Rogers World Airport' },
    { value: 'RIC', label: 'Richmond International Airport' },
    { value: 'SNA', label: 'John Wayne Airport' },
    { value: 'BUF', label: 'Buffalo Niagara International Airport' },
    { value: 'ABQ', label: 'Albuquerque International Sunport' },
    { value: 'ONT', label: 'Ontario International Airport' },
    { value: 'BHM', label: 'Birmingham-Shuttlesworth International Airport' },
    { value: 'PBI', label: 'Palm Beach International Airport' },
    { value: 'MEM', label: 'Memphis International Airport' },
    { value: 'BOI', label: 'Boise Airport' },
    { value: 'TUL', label: 'Tulsa International Airport' },
    { value: 'ANC', label: 'Ted Stevens Anchorage International Airport' },
    { value: 'RSW', label: 'Southwest Florida International Airport' },
    { value: 'CHS', label: 'Charleston International Airport' },
    { value: 'GSP', label: 'Greenville-Spartanburg International Airport' },
    { value: 'SDF', label: 'Louisville International Airport' },
    { value: 'ELP', label: 'El Paso International Airport' },
    { value: 'BDL', label: 'Bradley International Airport' },
    { value: 'TUS', label: 'Tucson International Airport' },
    { value: 'RNO', label: 'Reno-Tahoe International Airport' },
    { value: 'LIT', label: 'Bill and Hillary Clinton National Airport' },
    { value: 'PSP', label: 'Palm Springs International Airport' },
    { value: 'GEG', label: 'Spokane International Airport' },
    { value: 'BTV', label: 'Burlington International Airport' },
    { value: 'PWM', label: 'Portland International Jetport' },
    { value: 'SYR', label: 'Syracuse Hancock International Airport' },
    { value: 'ALB', label: 'Albany International Airport' },
    { value: 'GRR', label: 'Gerald R. Ford International Airport' },
    { value: 'PVD', label: 'T. F. Green Airport' },
    { value: 'SAV', label: 'Savannah/Hilton Head International Airport' },
    { value: 'GSO', label: 'Piedmont Triad International Airport' },
    { value: 'MYR', label: 'Myrtle Beach International Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'FAT', label: 'Fresno Yosemite International Airport' },
    { value: 'COS', label: 'Colorado Springs Airport' },
    { value: 'DAY', label: 'Dayton International Airport' },
    { value: 'LGB', label: 'Long Beach Airport' },
    { value: 'MSN', label: 'Dane County Regional Airport' },
    { value: 'ISP', label: 'Long Island MacArthur Airport' },
    { value: 'FSD', label: 'Sioux Falls Regional Airport' },
    { value: 'CAK', label: 'Akron-Canton Airport' },
    { value: 'XNA', label: 'Northwest Arkansas National Airport' },
    { value: 'ICT', label: 'Wichita Dwight D. Eisenhower National Airport' },
    { value: 'LFT', label: 'Lafayette Regional Airport' },
    { value: 'HSV', label: 'Huntsville International Airport' },
    { value: 'MHT', label: 'Manchester-Boston Regional Airport' },
    { value: 'BTR', label: 'Baton Rouge Metropolitan Airport' },
    { value: 'ROA', label: 'Roanoke-Blacksburg Regional Airport' },
    { value: 'FWA', label: 'Fort Wayne International Airport' },
    { value: 'GNV', label: 'Gainesville Regional Airport' },
    { value: 'CRW', label: 'Yeager Airport' },
    { value: 'LBB', label: 'Lubbock Preston Smith International Airport' },
    { value: 'MOB', label: 'Mobile Regional Airport' },
    { value: 'SHV', label: 'Shreveport Regional Airport' },
    { value: 'EVV', label: 'Evansville Regional Airport' },
    { value: 'FAR', label: 'Hector International Airport' },
    { value: 'TYS', label: 'McGhee Tyson Airport' },
    { value: 'AVL', label: 'Asheville Regional Airport' },
    { value: 'BIS', label: 'Bismarck Municipal Airport' },
    { value: 'PIA', label: 'General Wayne A. Downing Peoria International Airport' },
    { value: 'MLI', label: 'Quad City International Airport' },
    { value: 'MRY', label: 'Monterey Regional Airport' },
    { value: 'SBP', label: 'San Luis Obispo County Regional Airport' },
    { value: 'IDA', label: 'Idaho Falls Regional Airport' },
    { value: 'RAP', label: 'Rapid City Regional Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'FNT', label: 'Bishop International Airport' },
    { value: 'GRB', label: 'Green Bay Austin Straubel International Airport' },
    { value: 'MFE', label: 'McAllen Miller International Airport' },
    { value: 'LNK', label: 'Lincoln Airport' },
    { value: 'SGF', label: 'Springfield-Branson National Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'BGR', label: 'Bangor International Airport' },
    { value: 'MFR', label: 'Rogue Valley International-Medford Airport' },
    { value: 'PSC', label: 'Tri-Cities Airport' },
    { value: 'RDM', label: 'Redmond Municipal Airport' },
    { value: 'EUG', label: 'Eugene Airport' },
    { value: 'ACY', label: 'Atlantic City International Airport' },
    { value: 'SBA', label: 'Santa Barbara Municipal Airport' },
    { value: 'BLI', label: 'Bellingham International Airport' },
    { value: 'ECP', label: 'Northwest Florida Beaches International Airport' },
    { value: 'TLH', label: 'Tallahassee International Airport' },
    { value: 'GPT', label: 'Gulfport-Biloxi International Airport' },
    { value: 'AZO', label: 'Kalamazoo/Battle Creek International Airport' },
    { value: 'MGM', label: 'Montgomery Regional Airport' },
    { value: 'TRI', label: 'Tri-Cities Regional Airport' },
    { value: 'FAY', label: 'Fayetteville Regional Airport' },
    { value: 'LCH', label: 'Lake Charles Regional Airport' },
    { value: 'CSG', label: 'Columbus Metropolitan Airport' },
    { value: 'LAW', label: 'Lawton-Fort Sill Regional Airport' },
    { value: 'SWF', label: 'Stewart International Airport' },
    { value: 'HRL', label: 'Valley International Airport' },
    { value: 'MBS', label: 'MBS International Airport' },
    { value: 'BFL', label: 'Meadows Field Airport' },
    { value: 'SJT', label: 'San Angelo Regional Airport' },
    { value: 'TXK', label: 'Texarkana Regional Airport' },
    { value: 'ACT', label: 'Waco Regional Airport' },
    { value: 'ROW', label: 'Roswell International Air Center' },
    { value: 'LAR', label: 'Laramie Regional Airport' },
    { value: 'CPR', label: 'Casper-Natrona County International Airport' },
    { value: 'COD', label: 'Yellowstone Regional Airport' },
    { value: 'JAC', label: 'Jackson Hole Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'JFK', label: 'John F. Kennedy International Airport' },
    { value: 'LAX', label: 'Los Angeles International Airport' },
    { value: 'ORD', label: "O'Hare International Airport" },
    { value: 'ATL', label: 'Hartsfield-Jackson Atlanta International Airport' },
    { value: 'DFW', label: 'Dallas/Fort Worth International Airport' },
    { value: 'DEN', label: 'Denver International Airport' },
    { value: 'SFO', label: 'San Francisco International Airport' },
    { value: 'SEA', label: 'Seattle-Tacoma International Airport' },
    { value: 'LAS', label: 'McCarran International Airport' },
    { value: 'MCO', label: 'Orlando International Airport' },
    { value: 'CLT', label: 'Charlotte Douglas International Airport' },
    { value: 'PHX', label: 'Phoenix Sky Harbor International Airport' },
    { value: 'IAH', label: 'George Bush Intercontinental Airport' },
    { value: 'MIA', label: 'Miami International Airport' },
    { value: 'BOS', label: 'Logan International Airport' },
    { value: 'MSP', label: 'Minneapolis-Saint Paul International Airport' },
    { value: 'DTW', label: 'Detroit Metropolitan Airport' },
    { value: 'PHL', label: 'Philadelphia International Airport' },
    { value: 'LGA', label: 'LaGuardia Airport' },
    { value: 'FLL', label: 'Fort Lauderdale-Hollywood International Airport' },
    { value: 'BWI', label: 'Baltimore/Washington International Thurgood Marshall Airport' },
    { value: 'SLC', label: 'Salt Lake City International Airport' },
    { value: 'SAN', label: 'San Diego International Airport' },
    { value: 'IAD', label: 'Washington Dulles International Airport' },
    { value: 'DCA', label: 'Ronald Reagan Washington National Airport' },
    { value: 'MDW', label: 'Chicago Midway International Airport' },
    { value: 'TPA', label: 'Tampa International Airport' },
    { value: 'PDX', label: 'Portland International Airport' },
    { value: 'HNL', label: 'Daniel K. Inouye International Airport' },
    { value: 'STL', label: 'St. Louis Lambert International Airport' },
    { value: 'BNA', label: 'Nashville International Airport' },
    { value: 'AUS', label: 'Austin-Bergstrom International Airport' },
    { value: 'MCI', label: 'Kansas City International Airport' },
    { value: 'RDU', label: 'Raleigh-Durham International Airport' },
    { value: 'SJC', label: 'San Jose International Airport' },
    { value: 'OAK', label: 'Oakland International Airport' },
    { value: 'MSY', label: 'Louis Armstrong New Orleans International Airport' },
    { value: 'CLE', label: 'Cleveland Hopkins International Airport' },
    { value: 'SMF', label: 'Sacramento International Airport' },
    { value: 'SAT', label: 'San Antonio International Airport' },
    { value: 'PIT', label: 'Pittsburgh International Airport' },
    { value: 'IND', label: 'Indianapolis International Airport' },
    { value: 'CVG', label: 'Cincinnati/Northern Kentucky International Airport' },
    { value: 'MKE', label: 'Milwaukee Mitchell International Airport' },
    { value: 'JAX', label: 'Jacksonville International Airport' },
    { value: 'OMA', label: 'Eppley Airfield' },
    { value: 'OKC', label: 'Will Rogers World Airport' },
    { value: 'RIC', label: 'Richmond International Airport' },
    { value: 'SNA', label: 'John Wayne Airport' },
    { value: 'BUF', label: 'Buffalo Niagara International Airport' },
    { value: 'ABQ', label: 'Albuquerque International Sunport' },
    { value: 'ONT', label: 'Ontario International Airport' },
    { value: 'BHM', label: 'Birmingham-Shuttlesworth International Airport' },
    { value: 'PBI', label: 'Palm Beach International Airport' },
    { value: 'MEM', label: 'Memphis International Airport' },
    { value: 'BOI', label: 'Boise Airport' },
    { value: 'TUL', label: 'Tulsa International Airport' },
    { value: 'ANC', label: 'Ted Stevens Anchorage International Airport' },
    { value: 'RSW', label: 'Southwest Florida International Airport' },
    { value: 'CHS', label: 'Charleston International Airport' },
    { value: 'GSP', label: 'Greenville-Spartanburg International Airport' },
    { value: 'SDF', label: 'Louisville International Airport' },
    { value: 'ELP', label: 'El Paso International Airport' },
    { value: 'BDL', label: 'Bradley International Airport' },
    { value: 'TUS', label: 'Tucson International Airport' },
    { value: 'RNO', label: 'Reno-Tahoe International Airport' },
    { value: 'LIT', label: 'Bill and Hillary Clinton National Airport' },
    { value: 'PSP', label: 'Palm Springs International Airport' },
    { value: 'GEG', label: 'Spokane International Airport' },
    { value: 'BTV', label: 'Burlington International Airport' },
    { value: 'PWM', label: 'Portland International Jetport' },
    { value: 'SYR', label: 'Syracuse Hancock International Airport' },
    { value: 'ALB', label: 'Albany International Airport' },
    { value: 'GRR', label: 'Gerald R. Ford International Airport' },
    { value: 'PVD', label: 'T. F. Green Airport' },
    { value: 'SAV', label: 'Savannah/Hilton Head International Airport' },
    { value: 'GSO', label: 'Piedmont Triad International Airport' },
    { value: 'MYR', label: 'Myrtle Beach International Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'FAT', label: 'Fresno Yosemite International Airport' },
    { value: 'COS', label: 'Colorado Springs Airport' },
    { value: 'DAY', label: 'Dayton International Airport' },
    { value: 'LGB', label: 'Long Beach Airport' },
    { value: 'MSN', label: 'Dane County Regional Airport' },
    { value: 'ISP', label: 'Long Island MacArthur Airport' },
    { value: 'FSD', label: 'Sioux Falls Regional Airport' },
    { value: 'CAK', label: 'Akron-Canton Airport' },
    { value: 'XNA', label: 'Northwest Arkansas National Airport' },
    { value: 'ICT', label: 'Wichita Dwight D. Eisenhower National Airport' },
    { value: 'LFT', label: 'Lafayette Regional Airport' },
    { value: 'HSV', label: 'Huntsville International Airport' },
    { value: 'MHT', label: 'Manchester-Boston Regional Airport' },
    { value: 'BTR', label: 'Baton Rouge Metropolitan Airport' },
    { value: 'ROA', label: 'Roanoke-Blacksburg Regional Airport' },
    { value: 'FWA', label: 'Fort Wayne International Airport' },
    { value: 'GNV', label: 'Gainesville Regional Airport' },
    { value: 'CRW', label: 'Yeager Airport' },
    { value: 'LBB', label: 'Lubbock Preston Smith International Airport' },
    { value: 'MOB', label: 'Mobile Regional Airport' },
    { value: 'SHV', label: 'Shreveport Regional Airport' },
    { value: 'EVV', label: 'Evansville Regional Airport' },
    { value: 'FAR', label: 'Hector International Airport' },
    { value: 'TYS', label: 'McGhee Tyson Airport' },
    { value: 'AVL', label: 'Asheville Regional Airport' },
    { value: 'BIS', label: 'Bismarck Municipal Airport' },
    { value: 'PIA', label: 'General Wayne A. Downing Peoria International Airport' },
    { value: 'MLI', label: 'Quad City International Airport' },
    { value: 'MRY', label: 'Monterey Regional Airport' },
    { value: 'SBP', label: 'San Luis Obispo County Regional Airport' },
    { value: 'IDA', label: 'Idaho Falls Regional Airport' },
    { value: 'RAP', label: 'Rapid City Regional Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'FNT', label: 'Bishop International Airport' },
    { value: 'GRB', label: 'Green Bay Austin Straubel International Airport' },
    { value: 'MFE', label: 'McAllen Miller International Airport' },
    { value: 'LNK', label: 'Lincoln Airport' },
    { value: 'SGF', label: 'Springfield-Branson National Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'BGR', label: 'Bangor International Airport' },
    { value: 'MFR', label: 'Rogue Valley International-Medford Airport' },
    { value: 'PSC', label: 'Tri-Cities Airport' },
    { value: 'RDM', label: 'Redmond Municipal Airport' },
    { value: 'EUG', label: 'Eugene Airport' },
    { value: 'ACY', label: 'Atlantic City International Airport' },
    { value: 'SBA', label: 'Santa Barbara Municipal Airport' },
    { value: 'BLI', label: 'Bellingham International Airport' },
    { value: 'ECP', label: 'Northwest Florida Beaches International Airport' },
    { value: 'TLH', label: 'Tallahassee International Airport' },
    { value: 'GPT', label: 'Gulfport-Biloxi International Airport' },
    { value: 'AZO', label: 'Kalamazoo/Battle Creek International Airport' },
    { value: 'MGM', label: 'Montgomery Regional Airport' },
    { value: 'TRI', label: 'Tri-Cities Regional Airport' },
    { value: 'FAY', label: 'Fayetteville Regional Airport' },
    { value: 'LCH', label: 'Lake Charles Regional Airport' },
    { value: 'CSG', label: 'Columbus Metropolitan Airport' },
    { value: 'LAW', label: 'Lawton-Fort Sill Regional Airport' },
    { value: 'SWF', label: 'Stewart International Airport' },
    { value: 'HRL', label: 'Valley International Airport' },
    { value: 'MBS', label: 'MBS International Airport' },
    { value: 'BFL', label: 'Meadows Field Airport' },
    { value: 'SJT', label: 'San Angelo Regional Airport' },
    { value: 'TXK', label: 'Texarkana Regional Airport' },
    { value: 'ACT', label: 'Waco Regional Airport' },
    { value: 'ROW', label: 'Roswell International Air Center' },
    { value: 'LAR', label: 'Laramie Regional Airport' },
    { value: 'CPR', label: 'Casper-Natrona County International Airport' },
    { value: 'COD', label: 'Yellowstone Regional Airport' },
    { value: 'JAC', label: 'Jackson Hole Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
    { value: 'MSO', label: 'Missoula International Airport' },
    { value: 'BIL', label: 'Billings Logan International Airport' },
    { value: 'GTF', label: 'Great Falls International Airport' },
    { value: 'FCA', label: 'Glacier Park International Airport' },
    { value: 'BTM', label: 'Bert Mooney Airport' },
    { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
    { value: 'HLN', label: 'Helena Regional Airport' },
      // Pakistan Airports
      { value: 'KHI', label: 'Jinnah International Airport, Karachi' },
      { value: 'LHE', label: 'Allama Iqbal International Airport, Lahore' },
      { value: 'ISB', label: 'Islamabad International Airport, Islamabad' },
      { value: 'PEW', label: 'Bacha Khan International Airport, Peshawar' },
      { value: 'SKT', label: 'Sialkot International Airport, Sialkot' },
      // India Airports
      { value: 'DEL', label: 'Indira Gandhi International Airport, Delhi' },
      { value: 'BOM', label: 'Chhatrapati Shivaji Maharaj International Airport, Mumbai' },
      { value: 'BLR', label: 'Kempegowda International Airport, Bangalore' },
      { value: 'MAA', label: 'Chennai International Airport, Chennai' },
      { value: 'HYD', label: 'Rajiv Gandhi International Airport, Hyderabad' },
      // Other Asian Airports
      { value: 'DXB', label: 'Dubai International Airport, Dubai, UAE' },
      { value: 'HKG', label: 'Hong Kong International Airport, Hong Kong' },
      { value: 'SIN', label: 'Singapore Changi Airport, Singapore' },
      { value: 'BKK', label: 'Suvarnabhumi Airport, Bangkok, Thailand' },
      { value: 'NRT', label: 'Narita International Airport, Tokyo, Japan' },
      { value: 'ICN', label: 'Incheon International Airport, Seoul, South Korea' },
      { value: 'KUL', label: 'Kuala Lumpur International Airport, Malaysia' },
      { value: 'CGK', label: 'Soekarno-Hatta International Airport, Jakarta, Indonesia' },
      { value: 'MNL', label: 'Ninoy Aquino International Airport, Manila, Philippines' },
      { value: 'CAN', label: 'Guangzhou Baiyun International Airport, Guangzhou, China' },
      { value: 'PVG', label: 'Shanghai Pudong International Airport, Shanghai, China' },
      { value: 'PEK', label: 'Beijing Capital International Airport, Beijing, China' },
      { value: 'HND', label: 'Tokyo Haneda Airport, Tokyo, Japan' },
      { value: 'SGN', label: 'Tan Son Nhat International Airport, Ho Chi Minh City, Vietnam' },
      { value: 'HAN', label: 'Noi Bai International Airport, Hanoi, Vietnam' },
      { value: 'KIX', label: 'Kansai International Airport, Osaka, Japan' },
      { value: 'TPE', label: 'Taiwan Taoyuan International Airport, Taipei, Taiwan' },
      { value: 'HKT', label: 'Phuket International Airport, Phuket, Thailand' },
      { value: 'DPS', label: 'Ngurah Rai International Airport, Bali, Indonesia' },
      { value: 'CMB', label: 'Bandaranaike International Airport, Colombo, Sri Lanka' },
      { value: 'MLE', label: 'Velana International Airport, Malé, Maldives' },
      { value: 'DAC', label: 'Hazrat Shahjalal International Airport, Dhaka, Bangladesh' },
      { value: 'RGN', label: 'Yangon International Airport, Yangon, Myanmar' },
      { value: 'PNH', label: 'Phnom Penh International Airport, Phnom Penh, Cambodia' },
      { value: 'VTE', label: 'Wattay International Airport, Vientiane, Laos' },
      { value: 'ULN', label: 'Chinggis Khaan International Airport, Ulaanbaatar, Mongolia' },
      { value: 'TAS', label: 'Tashkent International Airport, Tashkent, Uzbekistan' },
      { value: 'ALA', label: 'Almaty International Airport, Almaty, Kazakhstan' },
      { value: 'GYD', label: 'Heydar Aliyev International Airport, Baku, Azerbaijan' },
      { value: 'EVN', label: 'Zvartnots International Airport, Yerevan, Armenia' },
      { value: 'TBS', label: 'Tbilisi International Airport, Tbilisi, Georgia' },
      { value: 'FRU', label: 'Manas International Airport, Bishkek, Kyrgyzstan' },
      { value: 'DME', label: 'Domodedovo International Airport, Moscow, Russia' },
      { value: 'SVO', label: 'Sheremetyevo International Airport, Moscow, Russia' },
      { value: 'LED', label: 'Pulkovo Airport, Saint Petersburg, Russia' },
      { value: 'VVO', label: 'Vladivostok International Airport, Vladivostok, Russia' },
      { value: 'KHV', label: 'Khabarovsk Novy Airport, Khabarovsk, Russia' },
      { value: 'OVB', label: 'Tolmachevo Airport, Novosibirsk, Russia' },
      { value: 'IKT', label: 'Irkutsk International Airport, Irkutsk, Russia' },
      { value: 'UUS', label: 'Yuzhno-Sakhalinsk Airport, Yuzhno-Sakhalinsk, Russia' },
      { value: 'KJA', label: 'Krasnoyarsk International Airport, Krasnoyarsk, Russia' },
      { value: 'SVX', label: 'Koltsovo Airport, Yekaterinburg, Russia' },
      { value: 'KZN', label: 'Kazan International Airport, Kazan, Russia' },
      { value: 'ROV', label: 'Platov International Airport, Rostov-on-Don, Russia' },
      { value: 'AER', label: 'Sochi International Airport, Sochi, Russia' },
      { value: 'ASF', label: 'Astrakhan Narimanovo Airport, Astrakhan, Russia' },
      { value: 'CEK', label: 'Chelyabinsk Airport, Chelyabinsk, Russia' },
      { value: 'KUF', label: 'Kurumoch International Airport, Samara, Russia' },
      { value: 'UFA', label: 'Ufa International Airport, Ufa, Russia' },
      { value: 'VOG', label: 'Volgograd International Airport, Volgograd, Russia' },
      { value: 'KRR', label: 'Krasnodar International Airport, Krasnodar, Russia' },
      { value: 'MRV', label: 'Mineralnye Vody Airport, Mineralnye Vody, Russia' },
      { value: 'NAL', label: 'Nalchik Airport, Nalchik, Russia' },
      { value: 'OGZ', label: 'Beslan Airport, Vladikavkaz, Russia' },
      { value: 'MCX', label: 'Uytash Airport, Makhachkala, Russia' },
      { value: 'GRV', label: 'Grozny Airport, Grozny, Russia' },
      { value: 'ESL', label: 'Elista Airport, Elista, Russia' },
      { value: 'STW', label: 'Stavropol Shpakovskoye Airport, Stavropol, Russia' },
      { value: 'AAQ', label: 'Anapa Airport, Anapa, Russia' },
      { value: 'GDZ', label: 'Gelendzhik Airport, Gelendzhik, Russia' },
      { value: 'IKS', label: 'Tiksi Airport, Tiksi, Russia' },
      { value: 'PYJ', label: 'Polyarny Airport, Polyarny, Russia' },
      { value: 'DYR', label: 'Ugolny Airport, Anadyr, Russia' },
      { value: 'PWE', label: 'Pevek Airport, Pevek, Russia' },
      { value: 'GDX', label: 'Sokol Airport, Magadan, Russia' },
      { value: 'PKC', label: 'Yelizovo Airport, Petropavlovsk-Kamchatsky, Russia' },
      { value: 'UUS', label: 'Yuzhno-Sakhalinsk Airport, Yuzhno-Sakhalinsk, Russia' },
      { value: 'HTA', label: 'Chita Kadala Airport, Chita, Russia' },
      { value: 'BTK', label: 'Bratsk Airport, Bratsk, Russia' },
      { value: 'IKT', label: 'Irkutsk International Airport, Irkutsk, Russia' },
      { value: 'UUD', label: 'Ulan-Ude Airport, Ulan-Ude, Russia' },
      { value: 'KBP', label: 'Boryspil International Airport, Kyiv, Ukraine' },
      { value: 'ODS', label: 'Odesa International Airport, Odesa, Ukraine' },
      { value: 'LWO', label: 'Lviv Danylo Halytskyi International Airport, Lviv, Ukraine' },
      { value: 'HRK', label: 'Kharkiv International Airport, Kharkiv, Ukraine' },
      { value: 'DOK', label: 'Donetsk International Airport, Donetsk, Ukraine' },
      { value: 'SIP', label: 'Simferopol International Airport, Simferopol, Ukraine' },
      { value: 'IEV', label: 'Kyiv International Airport (Zhuliany), Kyiv, Ukraine' },
      { value: 'DNK', label: 'Dnipropetrovsk International Airport, Dnipro, Ukraine' },
      { value: 'IFO', label: 'Ivano-Frankivsk International Airport, Ivano-Frankivsk, Ukraine' },
      { value: 'KHE', label: 'Kherson International Airport, Kherson, Ukraine' },
      { value: 'KWG', label: 'Kryvyi Rih International Airport, Kryvyi Rih, Ukraine' },
      { value: 'LUG', label: 'Luhansk International Airport, Luhansk, Ukraine' },
      { value: 'NLV', label: 'Mykolaiv International Airport, Mykolaiv, Ukraine' },
      { value: 'OZH', label: 'Zaporizhia International Airport, Zaporizhia, Ukraine' },
      { value: 'RWN', label: 'Rivne International Airport, Rivne, Ukraine' },
      { value: 'UDJ', label: 'Uzhhorod International Airport, Uzhhorod, Ukraine' },
      { value: 'VIN', label: 'Vinnytsia International Airport, Vinnytsia, Ukraine' },
      { value: 'VSG', label: 'Luhansk International Airport, Luhansk, Ukraine' },
      { value: 'ZTR', label: 'Zhytomyr Airport, Zhytomyr, Ukraine' },
      { value: 'KIV', label: 'Chișinău International Airport, Chișinău, Moldova' },
      { value: 'TGD', label: 'Podgorica Airport, Podgorica, Montenegro' },
      { value: 'TIV', label: 'Tivat Airport, Tivat, Montenegro' },
      { value: 'PRN', label: 'Pristina International Airport, Pristina, Kosovo' },
      { value: 'SKP', label: 'Skopje International Airport, Skopje, North Macedonia' },
      { value: 'OHD', label: 'Ohrid St. Paul the Apostle Airport, Ohrid, North Macedonia' },
      { value: 'TIA', label: 'Tirana International Airport Nënë Tereza, Tirana, Albania' },
      { value: 'BOJ', label: 'Burgas Airport, Burgas, Bulgaria' },
      { value: 'SOF', label: 'Sofia Airport, Sofia, Bulgaria' },
      { value: 'VAR', label: 'Varna Airport, Varna, Bulgaria' },
      { value: 'OTP', label: 'Henri Coandă International Airport, Bucharest, Romania' },
      { value: 'CLJ', label: 'Cluj-Napoca International Airport, Cluj-Napoca, Romania' },
      { value: 'TSR', label: 'Timișoara Traian Vuia International Airport, Timișoara, Romania' },
      { value: 'IAS', label: 'Iași International Airport, Iași, Romania' },
      { value: 'SBZ', label: 'Sibiu International Airport, Sibiu, Romania' },
      { value: 'CND', label: 'Mihail Kogălniceanu International Airport, Constanța, Romania' },
      { value: 'CRA', label: 'Craiova International Airport, Craiova, Romania' },
      { value: 'ARW', label: 'Arad International Airport, Arad, Romania' },
      { value: 'BCM', label: 'Bacău International Airport, Bacău, Romania' },
      { value: 'BAY', label: 'Baia Mare Airport, Baia Mare, Romania' },
      { value: 'OMR', label: 'Oradea International Airport, Oradea, Romania' },
      { value: 'SUJ', label: 'Satu Mare International Airport, Satu Mare, Romania' },
      { value: 'TGM', label: 'Transilvania Târgu Mureș International Airport, Târgu Mureș, Romania' },
      { value: 'SCV', label: 'Suceava Ștefan cel Mare International Airport, Suceava, Romania' },
      { value: 'BUD', label: 'Budapest Ferenc Liszt International Airport, Budapest, Hungary' },
      { value: 'DEB', label: 'Debrecen International Airport, Debrecen, Hungary' },
      { value: 'PEK', label: 'Beijing Capital International Airport, Beijing, China' },
      { value: 'PVG', label: 'Shanghai Pudong International Airport, Shanghai, China' },
      { value: 'CAN', label: 'Guangzhou Baiyun International Airport, Guangzhou, China' },
      { value: 'HGH', label: 'Hangzhou Xiaoshan International Airport, Hangzhou, China' },
      { value: 'SZX', label: 'Shenzhen Bao\'an International Airport, Shenzhen, China' },
      { value: 'CTU', label: 'Chengdu Shuangliu International Airport, Chengdu, China' },
      { value: 'CKG', label: 'Chongqing Jiangbei International Airport, Chongqing, China' },
      { value: 'XIY', label: 'Xi\'an Xianyang International Airport, Xi\'an, China' },
      { value: 'KMG', label: 'Kunming Changshui International Airport, Kunming, China' },
      { value: 'NKG', label: 'Nanjing Lukou International Airport, Nanjing, China' },
      { value: 'WUH', label: 'Wuhan Tianhe International Airport, Wuhan, China' },
      { value: 'SYX', label: 'Sanya Phoenix International Airport, Sanya, China' },
      { value: 'HRB', label: 'Harbin Taiping International Airport, Harbin, China' },
      { value: 'DLC', label: 'Dalian Zhoushuizi International Airport, Dalian, China' },
      { value: 'FOC', label: 'Fuzhou Changle International Airport, Fuzhou, China' },
      { value: 'TAO', label: 'Qingdao Liuting International Airport, Qingdao, China' },
      { value: 'XMN', label: 'Xiamen Gaoqi International Airport, Xiamen, China' },
      { value: 'CGO', label: 'Zhengzhou Xinzheng International Airport, Zhengzhou, China' },
      { value: 'HAK', label: 'Haikou Meilan International Airport, Haikou, China' },
      { value: 'TNA', label: 'Jinan Yaoqiang International Airport, Jinan, China' },
      { value: 'NGB', label: 'Ningbo Lishe International Airport, Ningbo, China' },
      { value: 'CSX', label: 'Changsha Huanghua International Airport, Changsha, China' },
      { value: 'HET', label: 'Hohhot Baita International Airport, Hohhot, China' },
      { value: 'URC', label: 'Ürümqi Diwopu International Airport, Ürümqi, China' },
      { value: 'KWE', label: 'Guiyang Longdongbao International Airport, Guiyang, China' },
      { value: 'NNG', label: 'Nanning Wuxu International Airport, Nanning, China' },
      { value: 'LHW', label: 'Lanzhou Zhongchuan International Airport, Lanzhou, China' },
      { value: 'KWL', label: 'Guilin Liangjiang International Airport, Guilin, China' },
      { value: 'HFE', label: 'Hefei Xinqiao International Airport, Hefei, China' },
      { value: 'TYN', label: 'Taiyuan Wusu International Airport, Taiyuan, China' },
      { value: 'CGQ', label: 'Changchun Longjia International Airport, Changchun, China' },
      { value: 'SHE', label: 'Shenyang Taoxian International Airport, Shenyang, China' },
      { value: 'NKG', label: 'Nanjing Lukou International Airport, Nanjing, China' },
      { value: 'WUX', label: 'Wuxi Sunan Shuofang International Airport, Wuxi, China' },
      { value: 'HYN', label: 'Taizhou Luqiao Airport, Taizconst airportOptions' },
      { value: 'JFK', label: 'John F. Kennedy International Airport' },
      { value: 'LAX', label: 'Los Angeles International Airport' },
      { value: 'ORD', label: "O'Hare International Airport" },
      // ... existing options ...
      { value: 'GTF', label: 'Great Falls International Airport' },
      { value: 'FCA', label: 'Glacier Park International Airport' },
      { value: 'BTM', label: 'Bert Mooney Airport' },
      { value: 'BZN', label: 'Bozeman Yellowstone International Airport' },
      { value: 'HLN', label: 'Helena Regional Airport' },
      // Pakistan Airports
      { value: 'KHI', label: 'Jinnah International Airport, Karachi' },
      { value: 'LHE', label: 'Allama Iqbal International Airport, Lahore' },
      { value: 'ISB', label: 'Islamabad International Airport, Islamabad' },
      { value: 'PEW', label: 'Bacha Khan International Airport, Peshawar' },
      { value: 'SKT', label: 'Sialkot International Airport, Sialkot' },
      // India Airports
      { value: 'DEL', label: 'Indira Gandhi International Airport, Delhi' },
      { value: 'BOM', label: 'Chhatrapati Shivaji Maharaj International Airport, Mumbai' },
      { value: 'BLR', label: 'Kempegowda International Airport, Bangalore' },
      { value: 'MAA', label: 'Chennai International Airport, Chennai' },
      { value: 'HYD', label: 'Rajiv Gandhi International Airport, Hyderabad' },
      // Other Asian Airports
      { value: 'DXB', label: 'Dubai International Airport, Dubai, UAE' },
      { value: 'HKG', label: 'Hong Kong International Airport, Hong Kong' },
      { value: 'SIN', label: 'Singapore Changi Airport, Singapore' },
      { value: 'BKK', label: 'Suvarnabhumi Airport, Bangkok, Thailand' },
      { value: 'NRT', label: 'Narita International Airport, Tokyo, Japan' },
      { value: 'ICN', label: 'Incheon International Airport, Seoul, South Korea' },
      { value: 'KUL', label: 'Kuala Lumpur International Airport, Malaysia' },
      { value: 'CGK', label: 'Soekarno-Hatta International Airport, Jakarta, Indonesia' },
      { value: 'MNL', label: 'Ninoy Aquino International Airport, Manila, Philippines' },
      { value: 'CAN', label: 'Guangzhou Baiyun International Airport, Guangzhou, China' },
      { value: 'PVG', label: 'Shanghai Pudong International Airport, Shanghai, China' },
      { value: 'PEK', label: 'Beijing Capital International Airport, Beijing, China' },
      { value: 'HND', label: 'Tokyo Haneda Airport, Tokyo, Japan' },
      { value: 'SGN', label: 'Tan Son Nhat International Airport, Ho Chi Minh City, Vietnam' },
      { value: 'HAN', label: 'Noi Bai International Airport, Hanoi, Vietnam' },
      { value: 'KIX', label: 'Kansai International Airport, Osaka, Japan' },
      { value: 'TPE', label: 'Taiwan Taoyuan International Airport, Taipei, Taiwan' },
      { value: 'HKT', label: 'Phuket International Airport, Phuket, Thailand' },
      { value: 'DPS', label: 'Ngurah Rai International Airport, Bali, Indonesia' },
      { value: 'CMB', label: 'Bandaranaike International Airport, Colombo, Sri Lanka' },
      { value: 'MLE', label: 'Velana International Airport, Malé, Maldives' },
      { value: 'DAC', label: 'Hazrat Shahjalal International Airport, Dhaka, Bangladesh' },
      { value: 'RGN', label: 'Yangon International Airport, Yangon, Myanmar' },
      { value: 'PNH', label: 'Phnom Penh International Airport, Phnom Penh, Cambodia' },
      { value: 'VTE', label: 'Wattay International Airport, Vientiane, Laos' },
      { value: 'ULN', label: 'Chinggis Khaan International Airport, Ulaanbaatar, Mongolia' },
      { value: 'TAS', label: 'Tashkent International Airport, Tashkent, Uzbekistan' },
      { value: 'ALA', label: 'Almaty International Airport, Almaty, Kazakhstan' },
      { value: 'GYD', label: 'Heydar Aliyev International Airport, Baku, Azerbaijan' },
      { value: 'EVN', label: 'Zvartnots International Airport, Yerevan, Armenia' },
      { value: 'TBS', label: 'Tbilisi International Airport, Tbilisi, Georgia' },
      { value: 'FRU', label: 'Manas International Airport, Bishkek, Kyrgyzstan' },
      { value: 'DME', label: 'Domodedovo International Airport, Moscow, Russia' },
      { value: 'SVO', label: 'Sheremetyevo International Airport, Moscow, Russia' },
      { value: 'LED', label: 'Pulkovo Airport, Saint Petersburg, Russia' },
      { value: 'VVO', label: 'Vladivostok International Airport, Vladivostok, Russia' },
      { value: 'KHV', label: 'Khabarovsk Novy Airport, Khabarovsk, Russia' },
      { value: 'OVB', label: 'Tolmachevo Airport, Novosibirsk, Russia' },
      { value: 'IKT', label: 'Irkutsk International Airport, Irkutsk, Russia' },
      { value: 'UUS', label: 'Yuzhno-Sakhalinsk Airport, Yuzhno-Sakhalinsk, Russia' },
      { value: 'KJA', label: 'Krasnoyarsk International Airport, Krasnoyarsk, Russia' },
      { value: 'SVX', label: 'Koltsovo Airport, Yekaterinburg, Russia' },
      { value: 'KZN', label: 'Kazan International Airport, Kazan, Russia' },
      { value: 'ROV', label: 'Platov International Airport, Rostov-on-Don, Russia' },
      { value: 'AER', label: 'Sochi International Airport, Sochi, Russia' },
      { value: 'ASF', label: 'Astrakhan Narimanovo Airport, Astrakhan, Russia' },
      { value: 'CEK', label: 'Chelyabinsk Airport, Chelyabinsk, Russia' },
      { value: 'KUF', label: 'Kurumoch International Airport, Samara, Russia' },
      { value: 'UFA', label: 'Ufa International Airport, Ufa, Russia' },
      { value: 'VOG', label: 'Volgograd International Airport, Volgograd, Russia' },
      { value: 'KRR', label: 'Krasnodar International Airport, Krasnodar, Russia' },
      { value: 'MRV', label: 'Mineralnye Vody Airport, Mineralnye Vody, Russia' },
      { value: 'NAL', label: 'Nalchik Airport, Nalchik, Russia' },
      { value: 'OGZ', label: 'Beslan Airport, Vladikavkaz, Russia' },
      { value: 'MCX', label: 'Uytash Airport, Makhachkala, Russia' },
      { value: 'GRV', label: 'Grozny Airport, Grozny, Russia' },
      { value: 'ESL', label: 'Elista Airport, Elista, Russia' },
      { value: 'STW', label: 'Stavropol Shpakovskoye Airport, Stavropol, Russia' },
      { value: 'AAQ', label: 'Anapa Airport, Anapa, Russia' },
      { value: 'GDZ', label: 'Gelendzhik Airport, Gelendzhik, Russia' },
      { value: 'IKS', label: 'Tiksi Airport, Tiksi, Russia' },
      { value: 'PYJ', label: 'Polyarny Airport, Polyarny, Russia' },
      { value: 'DYR', label: 'Ugolny Airport, Anadyr, Russia' },
      { value: 'PWE', label: 'Pevek Airport, Pevek, Russia' },
      { value: 'GDX', label: 'Sokol Airport, Magadan, Russia' },
      { value: 'PKC', label: 'Yelizovo Airport, Petropavlovsk-Kamchatsky, Russia' },
      { value: 'UUS', label: 'Yuzhno-Sakhalinsk Airport, Yuzhno-Sakhalinsk, Russia' },
      { value: 'HTA', label: 'Chita Kadala Airport, Chita, Russia' },
      { value: 'BTK', label: 'Bratsk Airport, Bratsk, Russia' },
      { value: 'IKT', label: 'Irkutsk International Airport, Irkutsk, Russia' },
      { value: 'UUD', label: 'Ulan-Ude Airport, Ulan-Ude, Russia' },
      { value: 'KBP', label: 'Boryspil International Airport, Kyiv, Ukraine' },
      { value: 'ODS', label: 'Odesa International Airport, Odesa, Ukraine' },
      { value: 'LWO', label: 'Lviv Danylo Halytskyi International Airport, Lviv, Ukraine' },
      { value: 'HRK', label: 'Kharkiv International Airport, Kharkiv, Ukraine' },
      { value: 'DOK', label: 'Donetsk International Airport, Donetsk, Ukraine' },
      { value: 'SIP', label: 'Simferopol International Airport, Simferopol, Ukraine' },
      { value: 'IEV', label: 'Kyiv International Airport (Zhuliany), Kyiv, Ukraine' },
      { value: 'DNK', label: 'Dnipropetrovsk International Airport, Dnipro, Ukraine' },
      { value: 'IFO', label: 'Ivano-Frankivsk International Airport, Ivano-Frankivsk, Ukraine' },
      { value: 'KHE', label: 'Kherson International Airport, Kherson, Ukraine' },
      { value: 'KWG', label: 'Kryvyi Rih International Airport, Kryvyi Rih, Ukraine' },
      { value: 'LUG', label: 'Luhansk International Airport, Luhansk, Ukraine' },
      { value: 'NLV', label: 'Mykolaiv International Airport, Mykolaiv, Ukraine' },
      { value: 'OZH', label: 'Zaporizhia International Airport, Zaporizhia, Ukraine' },
      { value: 'RWN', label: 'Rivne International Airport, Rivne, Ukraine' },
      { value: 'UDJ', label: 'Uzhhorod International Airport, Uzhhorod, Ukraine' },
      { value: 'VIN', label: 'Vinnytsia International Airport, Vinnytsia, Ukraine' },
      { value: 'VSG', label: 'Luhansk International Airport, Luhansk, Ukraine' },
      { value: 'ZTR', label: 'Zhytomyr Airport, Zhytomyr, Ukraine' },
      { value: 'KIV', label: 'Chișinău International Airport, Chișinău, Moldova' },
      { value: 'TGD', label: 'Podgorica Airport, Podgorica, Montenegro' },
      { value: 'TIV', label: 'Tivat Airport, Tivat, Montenegro' },
      { value: 'PRN', label: 'Pristina International Airport, Pristina, Kosovo' },
      { value: 'SKP', label: 'Skopje International Airport, Skopje, North Macedonia' },
      { value: 'OHD', label: 'Ohrid St. Paul the Apostle Airport, Ohrid, North Macedonia' },
      { value: 'TIA', label: 'Tirana International Airport Nënë Tereza, Tirana, Albania' },
      { value: 'BOJ', label: 'Burgas Airport, Burgas, Bulgaria' },
      { value: 'SOF', label: 'Sofia Airport, Sofia, Bulgaria' },
      { value: 'VAR', label: 'Varna Airport, Varna, Bulgaria' },
      { value: 'OTP', label: 'Henri Coandă International Airport, Bucharest, Romania' },
      { value: 'CLJ', label: 'Cluj-Napoca International Airport, Cluj-Napoca, Romania' },
      { value: 'TSR', label: 'Timișoara Traian Vuia International Airport, Timișoara, Romania' },
      { value: 'IAS', label: 'Iași International Airport, Iași, Romania' },
      { value: 'SBZ', label: 'Sibiu International Airport, Sibiu, Romania' },
      { value: 'CND', label: 'Mihail Kogălniceanu International Airport, Constanța, Romania' },
      { value: 'CRA', label: 'Craiova International Airport, Craiova, Romania' },
      { value: 'ARW', label: 'Arad International Airport, Arad, Romania' },
      { value: 'BCM', label: 'Bacău International Airport, Bacău, Romania' },
      { value: 'BAY', label: 'Baia Mare Airport, Baia Mare, Romania' },
      { value: 'OMR', label: 'Oradea International Airport, Oradea, Romania' },
      { value: 'SUJ', label: 'Satu Mare International Airport, Satu Mare, Romania' },
      { value: 'TGM', label: 'Transilvania Târgu Mureș International Airport, Târgu Mureș, Romania' },
      { value: 'SCV', label: 'Suceava Ștefan cel Mare International Airport, Suceava, Romania' },
      { value: 'BUD', label: 'Budapest Ferenc Liszt International Airport, Budapest, Hungary' },
      { value: 'DEB', label: 'Debrecen International Airport, Debrecen, Hungary' },
      { value: 'PEK', label: 'Beijing Capital International Airport, Beijing, China' },
      { value: 'PVG', label: 'Shanghai Pudong International Airport, Shanghai, China' },
      { value: 'CAN', label: 'Guangzhou Baiyun International Airport, Guangzhou, China' },
      { value: 'HGH', label: 'Hangzhou Xiaoshan International Airport, Hangzhou, China' },
      { value: 'SZX', label: 'Shenzhen Bao\'an International Airport, Shenzhen, China' },
      { value: 'CTU', label: 'Chengdu Shuangliu International Airport, Chengdu, China' },
      { value: 'CKG', label: 'Chongqing Jiangbei International Airport, Chongqing, China' },
      { value: 'XIY', label: 'Xi\'an Xianyang International Airport, Xi\'an, China' },
      { value: 'KMG', label: 'Kunming Changshui International Airport, Kunming, China' },
      { value: 'NKG', label: 'Nanjing Lukou International Airport, Nanjing, China' },
      { value: 'WUH', label: 'Wuhan Tianhe International Airport, Wuhan, China' },
      { value: 'SYX', label: 'Sanya Phoenix International Airport, Sanya, China' },
      { value: 'HRB', label: 'Harbin Taiping International Airport, Harbin, China' },
      { value: 'DLC', label: 'Dalian Zhoushuizi International Airport, Dalian, China' },
      { value: 'FOC', label: 'Fuzhou Changle International Airport, Fuzhou, China' },
      { value: 'TAO', label: 'Qingdao Liuting International Airport, Qingdao, China' },
      { value: 'XMN', label: 'Xiamen Gaoqi International Airport, Xiamen, China' },
      { value: 'CGO', label: 'Zhengzhou Xinzheng International Airport, Zhengzhou, China' },
      { value: 'HAK', label: 'Haikou Meilan International Airport, Haikou, China' },
      { value: 'TNA', label: 'Jinan Yaoqiang International Airport, Jinan, China' },
      { value: 'NGB', label: 'Ningbo Lishe International Airport, Ningbo, China' },
      { value: 'CSX', label: 'Changsha Huanghua International Airport, Changsha, China' },
      { value: 'HET', label: 'Hohhot Baita International Airport, Hohhot, China' },
      { value: 'URC', label: 'Ürümqi Diwopu International Airport, Ürümqi, China' },
      { value: 'KWE', label: 'Guiyang Longdongbao International Airport, Guiyang, China' },
      { value: 'NNG', label: 'Nanning Wuxu International Airport, Nanning, China' },
      { value: 'LHW', label: 'Lanzhou Zhongchuan International Airport, Lanzhou, China' },
      { value: 'KWL', label: 'Guilin Liangjiang International Airport, Guilin, China' },
      { value: 'HFE', label: 'Hefei Xinqiao International Airport, Hefei, China' },
      { value: 'TYN', label: 'Taiyuan Wusu International Airport, Taiyuan, China' },
      { value: 'CGQ', label: 'Changchun Longjia International Airport, Changchun, China' },
      { value: 'SHE', label: 'Shenyang Taoxian International Airport, Shenyang, China' },
      { value: 'NKG', label: 'Nanjing Lukou International Airport, Nanjing, China' },
      { value: 'WUX', label: 'Wuxi Sunan Shuofang International Airport, Wuxi, China' },
    // Add more options as needed
  ];


  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : airportOptions.filter(
      airport => airport.label.toLowerCase().includes(inputValue) || airport.value.toLowerCase().includes(inputValue)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChangeFrom = (event, { newValue }) => {
    setValueFrom(newValue);
    setFormData({ ...formData, flyingFrom: newValue });
  };

  const onChangeTo = (event, { newValue }) => {
    setValueTo(newValue);
    setFormData({ ...formData, flyingTo: newValue });
  };

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.label}
    </div>
  );

  const renderFlightFields = () => (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.label}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Flying From',
          value: valueFrom,
          name: 'flyingFrom',
          onChange: onChangeFrom,
          onFocus: handleExpand,
          className: 'input-field'
        }}
      />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.label}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Flying To',
          value: valueTo,
          name: 'flyingTo',
          onChange: onChangeTo,
          onFocus: handleExpand,
          className: 'input-field'
        }}
      />
      <input type="date" name="departureDate" onChange={handleInputChange} className="input-field" />
      {tripType === 'return' && (
        <input type="date" name="returnDate" onChange={handleInputChange} className="input-field" />
      )}
      {isExpanded && !isMobile && (
        <>
          <input
            type="text"
            name="airline"
            placeholder="Airline"
            onChange={handleInputChange}
            className="input-field"
          />
          <select name="class" onChange={handleInputChange} className="input-field">
            <option value="">Class</option>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
          <select name="passengers" onChange={handleInputChange} className="input-field">
            <option value="">No of Passengers</option>
            {[...Array(9).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1} Passenger{num > 0 ? 's' : ''}
              </option>
            ))}
          </select>
          <select name="tripType" value={tripType} onChange={handleTripTypeChange} className="input-field">
            <option value="return">Return Trip</option>
            <option value="one-way">One-Sided Trip</option>
            <option value="multi">Multiple Destinations</option>
          </select>
        </>
      )}
    </>
  );

  const renderHotelFields = () => (
    <>
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        onChange={handleInputChange}
        onFocus={handleExpand}
        className="input-field"
      />
      <input type="date" name="checkInDate" onChange={handleInputChange} className="input-field" />
      <input type="date" name="checkOutDate" onChange={handleInputChange} className="input-field" />
      {isExpanded && !isMobile && (
        <>
          <select name="rooms" onChange={handleInputChange} className="input-field">
            <option value="">No of Rooms</option>
            {[...Array(9).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1} Room{num > 0 ? 's' : ''}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="guestsAge"
            placeholder="Guests Age"
            onChange={handleInputChange}
            className="input-field"
          />
        </>
      )}
    </>
  );

  const renderFlightHotelFields = () => (
    <>
      {renderFlightFields()}
    </>
  );

  const renderPackageFields = () => (
    <>
      <input
        type="text"
        name="destination"
        placeholder="Destination"
        onChange={handleInputChange}
        className="input-field"
      />
      <input type="date" name="startDate" onChange={handleInputChange} className="input-field" />
      <input type="date" name="endDate" onChange={handleInputChange} className="input-field" />
      <select name="numberOfPeople" onChange={handleInputChange} className="input-field">
        <option value="">No of People</option>
        {[...Array(9).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1} Person{num > 0 ? 's' : ''}
          </option>
        ))}
      </select>
    </>
  );

  const renderFormFields = () => {
    switch (activeTab) {
      case 'flights':
        return renderFlightFields();
      case 'hotels':
        return renderHotelFields();
      case 'flightHotels':
        return renderFlightHotelFields();
      case 'packages':
        return renderPackageFields();
      default:
        return null;
    }
  };

  return (
    <div className="search-bar">
      <div className="tabs">
        <button
          className={activeTab === 'flights' ? 'active' : ''}
          onClick={() => handleTabClick('flights')}
        >
          Flights
        </button>
        <button
          className={activeTab === 'hotels' ? 'active' : ''}
          onClick={() => handleTabClick('hotels')}
        >
          Hotels
        </button>
        <button
          className={activeTab === 'flightHotels' ? 'active' : ''}
          onClick={() => handleTabClick('flightHotels')}
        >
          Flight & Hotels
        </button>
        <button
          className={activeTab === 'packages' ? 'active' : ''}
          onClick={() => handleTabClick('packages')}
        >
          Packages
        </button>
      </div>
      <div className="form-fields">{renderFormFields()}</div>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;