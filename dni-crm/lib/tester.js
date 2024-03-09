/*
        var x = Object.entries(this.constructor.tests()).filter(([key, item]) => typeof item === 'function')
            .reduce((acc, [key, item]) => {
                console.log('item: ' + item);
                acc[key] = item;
                this[key] = item;
                return acc;
            }, {}
        );
        this['tests'] = function () { return x; }; 
*/
