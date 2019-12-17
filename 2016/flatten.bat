FOR %%A IN (01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25) DO (
	mv %%A/%%A-1.js ../%%A-1.js
	mv %%A/%%A-2.js ../%%A-2.js
	mv %%A/%%A-input.txt ../%%A-input.txt
)
