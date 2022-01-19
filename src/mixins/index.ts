import { mapActions } from 'vuex'

// Distribute to components using global mixin
export const mixins = {
  methods: {
    ...mapActions(['addSub']),

    /**
     * Truncate strings and append ellipsis
     */
    truncate: (string: string, value: string | number): string => {
      if (!value) return ''
      value = value.toString()
      let stringNew = string.toString()
      stringNew = stringNew.substring(0, +value)
      if (string.length > +value) {
        stringNew += '...'
      }
      return stringNew
    },

    /**
     * Format date
     */
    date: (value: string): string => {
      const newDate = new Date(+value * 1000)
      return newDate.toLocaleDateString('en-GB')
    },

    /**
     * Convert youtube links to embed versions
     */
    embed: (url: string): string => {
      return url.replace('watch?v=', 'embed/')
    },
  },
}
