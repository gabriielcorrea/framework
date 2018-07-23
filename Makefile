CSS = \
	css/styles.css

#JS = \
	js/scripts.min.js

all: css

clean:
	rm -f $(CSS)
	#rm -f $(JS)

css: $(CSS)

#js: $(JS)

%.css: %.less
	lessc $< > $@

#%.min.js: %.js
#	uglifyjs $< > $@

.PHONY: all clean
