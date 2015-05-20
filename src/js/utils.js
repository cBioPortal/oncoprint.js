/*
 * Copyright (c) 2015 Memorial Sloan-Kettering Cancer Center.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS
 * FOR A PARTICULAR PURPOSE. The software and documentation provided hereunder
 * is on an "as is" basis, and Memorial Sloan-Kettering Cancer Center has no
 * obligations to provide maintenance, support, updates, enhancements or
 * modifications. In no event shall Memorial Sloan-Kettering Cancer Center be
 * liable to any party for direct, indirect, special, incidental or
 * consequential damages, including lost profits, arising out of the use of this
 * software and its documentation, even if Memorial Sloan-Kettering Cancer
 * Center has been advised of the possibility of such damage.
 */

/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var _ = require("underscore");

var exports = module.exports = {};

exports.invert_array = function invert_array(arr) {
	return arr.reduce(function(curr, next, index) {
		curr[next] = index;
		return curr;
	}, {});
};

exports.makeD3SVGElement = function(tag) {
	return d3.select(document.createElementNS('http://www.w3.org/2000/svg', tag));
};

exports.warn = function(str, context) {
	console.log("Oncoprint error in "+context+": "+str);
};

exports.stableSort = function(arr, cmp) {
	// cmp returns something in [-1,0,1]

	cmp = [].concat(cmp);
	var index_cmp = function(a,b) {
		if (a[1] < b[1]) {
			return -1;
		} else if (a[1] > b[1]) {
			return 1;
		} else {
			return 0;
		}
	};
	cmp = cmp.concat(index_cmp); // stable

	var ordered_cmp = function(a,b) {
		var res = 0;
		var cmp_ind = 0;
		while (res === 0 && cmp_ind < cmp.length) {
			res = (cmp[cmp_ind])(a[0],b[0]);
			cmp_ind += 1;
		}
		return res;
	};
	var zipped = [];
	_.each(arr, function(val, ind) {
		zipped.push([val, ind]);
	})
	zipped.sort(ordered_cmp);
	return _.map(zipped, function(x) { return x[0];});
};

exports.translate = function(x,y) {
	return "translate(" + x + "," + y + ")";
};

exports.assert = function(bool, msg) {
	if (!bool) {
		throw msg;
	}
}
