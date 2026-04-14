/** World countries sorted alphabetically. */
export const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia',
  'Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium',
  'Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei',
  'Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic',
  'Chad','Chile','China','Colombia','Comoros','Congo (DRC)','Congo (Republic)','Costa Rica',
  'Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic',
  'Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia',
  'Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada',
  'Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India',
  'Indonesia','Iran','Iraq','Ireland','Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan',
  'Kazakhstan','Kenya','Kiribati','Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon',
  'Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi',
  'Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico',
  'Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar',
  'Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria',
  'North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama',
  'Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania',
  'Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines',
  'Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles',
  'Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa',
  'South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland',
  'Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga',
  'Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine',
  'United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu',
  'Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
] as const

/**
 * Provinces / states / regions for key markets.
 * Returns an array of region names for supported countries, or null for free-text entry.
 */
export function getRegions(country: string): string[] | null {
  const c = country.trim()
  return REGIONS[c] ?? null
}

const REGIONS: Record<string, string[]> = {
  'Zimbabwe': [
    'Bulawayo','Harare','Manicaland','Mashonaland Central','Mashonaland East',
    'Mashonaland West','Masvingo','Matabeleland North','Matabeleland South','Midlands',
  ],
  'South Africa': [
    'Eastern Cape','Free State','Gauteng','KwaZulu-Natal','Limpopo',
    'Mpumalanga','North West','Northern Cape','Western Cape',
  ],
  'Mozambique': [
    'Cabo Delgado','Gaza','Inhambane','Manica','Maputo City','Maputo Province',
    'Nampula','Niassa','Sofala','Tete','Zambezia',
  ],
  'Zambia': [
    'Central','Copperbelt','Eastern','Luapula','Lusaka',
    'Muchinga','Northern','North-Western','Southern','Western',
  ],
  'Malawi': [
    'Central Region','Northern Region','Southern Region',
  ],
  'Botswana': [
    'Central','Ghanzi','Kgalagadi','Kgatleng','Kweneng',
    'North-East','North-West','South-East','Southern',
  ],
  'Namibia': [
    'Erongo','Hardap','Karas','Kavango East','Kavango West',
    'Khomas','Kunene','Ohangwena','Omaheke','Omusati',
    'Oshana','Oshikoto','Otjozondjupa','Zambezi',
  ],
  'Tanzania': [
    'Arusha','Dar es Salaam','Dodoma','Geita','Iringa','Kagera',
    'Katavi','Kigoma','Kilimanjaro','Lindi','Manyara','Mara',
    'Mbeya','Morogoro','Mtwara','Mwanza','Njombe','Pemba North',
    'Pemba South','Pwani','Rukwa','Ruvuma','Shinyanga','Simiyu',
    'Singida','Songwe','Tabora','Tanga','Unguja North','Unguja South','Zanzibar',
  ],
  'Kenya': [
    'Baringo','Bomet','Bungoma','Busia','Elgeyo-Marakwet','Embu','Garissa',
    'Homa Bay','Isiolo','Kajiado','Kakamega','Kericho','Kiambu','Kilifi',
    'Kirinyaga','Kisii','Kisumu','Kitui','Kwale','Laikipia','Lamu','Machakos',
    'Makueni','Mandera','Marsabit','Meru','Migori','Mombasa','Murang\'a',
    'Nairobi','Nakuru','Nandi','Narok','Nyamira','Nyandarua','Nyeri',
    'Samburu','Siaya','Taita-Taveta','Tana River','Tharaka-Nithi','Trans-Nzoia',
    'Turkana','Uasin Gishu','Vihiga','Wajir','West Pokot',
  ],
  'Uganda': [
    'Central','Eastern','Northern','Western',
  ],
  'Congo (DRC)': [
    'Bas-Uele','Equateur','Haut-Katanga','Haut-Lomami','Haut-Uele','Ituri',
    'Kasai','Kasai Central','Kasai Oriental','Kinshasa','Kongo Central','Kwango',
    'Kwilu','Lomami','Lualaba','Mai-Ndombe','Maniema','Mongala','Nord-Kivu',
    'Nord-Ubangi','Sankuru','Sud-Kivu','Sud-Ubangi','Tanganyika','Tshopo','Tshuapa',
  ],
  'Nigeria': [
    'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
    'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
    'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
    'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara',
  ],
  'Ghana': [
    'Ahafo','Ashanti','Bono','Bono East','Central','Eastern',
    'Greater Accra','North East','Northern','Oti','Savannah',
    'Upper East','Upper West','Volta','Western','Western North',
  ],
  'United Kingdom': [
    'England','Scotland','Wales','Northern Ireland',
  ],
  'United States': [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
    'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
    'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
    'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
    'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
    'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
    'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
    'Wisconsin','Wyoming','District of Columbia',
  ],
  'India': [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa',
    'Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
    'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
    'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
    'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Chandigarh','Puducherry',
  ],
  'China': [
    'Anhui','Beijing','Chongqing','Fujian','Gansu','Guangdong','Guangxi','Guizhou',
    'Hainan','Hebei','Heilongjiang','Henan','Hubei','Hunan','Inner Mongolia',
    'Jiangsu','Jiangxi','Jilin','Liaoning','Ningxia','Qinghai','Shaanxi','Shandong',
    'Shanghai','Shanxi','Sichuan','Tianjin','Tibet','Xinjiang','Yunnan','Zhejiang',
  ],
  'Australia': [
    'Australian Capital Territory','New South Wales','Northern Territory',
    'Queensland','South Australia','Tasmania','Victoria','Western Australia',
  ],
  'Brazil': [
    'Acre','Alagoas','Amapá','Amazonas','Bahia','Ceará','Distrito Federal',
    'Espírito Santo','Goiás','Maranhão','Mato Grosso','Mato Grosso do Sul',
    'Minas Gerais','Pará','Paraíba','Paraná','Pernambuco','Piauí',
    'Rio de Janeiro','Rio Grande do Norte','Rio Grande do Sul','Rondônia',
    'Roraima','Santa Catarina','São Paulo','Sergipe','Tocantins',
  ],
  'Egypt': [
    'Alexandria','Aswan','Asyut','Beheira','Beni Suef','Cairo','Dakahlia',
    'Damietta','Faiyum','Gharbia','Giza','Ismailia','Kafr el-Sheikh',
    'Luxor','Matruh','Minya','Monufia','New Valley','North Sinai','Port Said',
    'Qalyubia','Qena','Red Sea','Sharqia','Sohag','South Sinai','Suez',
  ],
  'United Arab Emirates': [
    'Abu Dhabi','Ajman','Dubai','Fujairah','Ras Al Khaimah','Sharjah','Umm Al Quwain',
  ],
  'Saudi Arabia': [
    'Asir','Bahah','Eastern Province','Ha\'il','Jazan','Jawf','Madinah',
    'Makkah','Najran','Northern Borders','Qassim','Riyadh','Tabuk',
  ],
}
